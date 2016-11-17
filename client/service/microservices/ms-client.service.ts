import {Injectable} from '@angular/core';
import {Headers, Http, URLSearchParams, RequestOptions} from '@angular/http';
// import {Config} from 'client/config';

import 'rxjs/add/operator/toPromise';
import {PendingRequestsService} from "../pending-requests.service";

@Injectable()
export class MsClientService {
    url: string;
    services: [{}] = window['services']; // todo move this to root route resolver

    constructor(protected Http: Http, protected PendingRequestsService: PendingRequestsService) {
    }

    getServiceUrl(serviceName: string) {
        let url = '';

        this.services.forEach(function (service: {category: string, name: string, value: {url: string}}) {
            if (service.category === 'services' && service.name === serviceName) {
                url = service.value.url;
                return;
            }
        });

        if (!url) {
            throw new Error('no url for ' + serviceName);
        }

        return url;
    }

    /**
     * Make http call to microservice.
     *
     * @param {String} action
     * @param {String} method GET, POST, PUT, DELETE
     * @param {} data
     * @param {String} authSessionId
     *
     */
    public makeMsCall(action: string, method: string, data: {} = {}, authSessionId: string = '') {
        let params, body;
        let headers = new Headers({
            'Content-Type': 'application/json',
            'auth-session-id': authSessionId
        });

        this.PendingRequestsService.hasPendingRequest = true;

        console.log('makeMsCall ' + action, authSessionId);

        if (method === 'GET' || method === 'DELETE') {
            params = new URLSearchParams();
            for (let prop in data) {
                if (data.hasOwnProperty(prop)) {
                    let value = data[prop];

                    if (Array.isArray(value)) {
                        value.forEach(function (val) {
                            params.append(prop + '[]', val)
                        })
                    } else {
                        params.set(prop, data[prop]);
                    }
                }
            }
        } else if (method === 'POST' || method === 'PUT') {
            body = JSON.stringify(data);
        }

        let requestOptions = new RequestOptions({
            headers: headers,
            method: method,
            search: params ? params : null,
            body: body ? body : null,
            withCredentials: true
        });

        return this.Http.request(this.url + action, requestOptions)
            .toPromise()
            .then(response => {
                this.PendingRequestsService.hasPendingRequest = false;

                let resObj = response.json();

                return resObj.result;
            })
            .catch((response: any) => {
                this.PendingRequestsService.hasPendingRequest = false;

                this.handleError(response);
            });
    }

    protected handleError(response: any): Promise<any>|string {
        let message = response.statusText;

        if (response['_body']) {
            let jsonBody = JSON.parse(response['_body']);

            if (jsonBody.message) {
                message = jsonBody.message;
            }
        }

        this.PendingRequestsService.httpResponseError = message;

        if (response.status === 401) {
            Promise.reject(new Error('not authorized'));

            return window.location.href = '/#/auth/procore'; // todo use app.router here
        }

        return Promise.reject(response.message || response);
    }

    create(data: {}, authUserSessionId: string): Promise<[number]> {
        return this.makeMsCall(
            'create',
            'POST',
            data,
            authUserSessionId
        );
    }

    update(id, data: {}, authUserSessionId: string): Promise<number> {
        return this.makeMsCall(
            'update/' + id,
            'PUT',
            data,
            authUserSessionId
        );
    }

}
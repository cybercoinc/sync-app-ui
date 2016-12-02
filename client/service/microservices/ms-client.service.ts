import {Injectable} from '@angular/core';
import {Headers, Http, URLSearchParams, RequestOptions} from '@angular/http';
// import {Config} from 'client/config';

import 'rxjs/add/operator/toPromise';
import {PendingRequestsService} from "../pending-requests.service";
import {Router} from "@angular/router";

@Injectable()
export class MsClientService {
    url: string;
    services: [{}] = window['services']; // todo move this to root route resolver

    constructor(protected Http: Http, protected PendingRequestsService: PendingRequestsService,
                protected router: Router) {
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
     * @param {Number|null} authTokenId
     *
     */
    public makeMsCall(action: string, method: string, data: {} = {}, authTokenId = null) {
        let params, body;
        let headers = new Headers({
            'Content-Type': 'application/json',
            'auth-token-id': authTokenId
        });

        this.PendingRequestsService.hasPendingRequest = true;

        console.log('makeMsCall ' + action, authTokenId);

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

                return this.handleError(response);
            });
    }

    protected handleError(response: any): Promise<any>|string {
        let message = response.statusText;

        if (response['ok'] && response['_body']) {
            let jsonBody = JSON.parse(response['_body']);

            if (jsonBody.message) {
                message = jsonBody.message;
            }
        }

        this.PendingRequestsService.httpResponseErrors.push(
            message
        );

        if (response.status === 401) {
            Promise.reject(new Error('not authorized'));

            this.router.navigate(['/auth', 'procore']);

            // return window.location.href = '/#/auth/procore'; // todo use app.router here
        }

        return Promise.reject(response.message || response);
    }

    create(data: {}, authTokenId): Promise<[number]> {
        return this.makeMsCall(
            'create',
            'POST',
            data,
            authTokenId
        );
    }

    update(id, data: {}, authTokenId): Promise<number> {
        return this.makeMsCall(
            'update/' + id,
            'PUT',
            data,
            authTokenId
        );
    }

    findManyByIdsList(idsList: [number], authTokenId): Promise<[any]> {
        return this.makeMsCall(
            'find-many-by-ids-list',
            'GET',
            idsList,
            authTokenId
        );
    }



}
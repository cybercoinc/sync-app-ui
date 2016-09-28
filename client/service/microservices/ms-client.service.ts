import {Injectable} from '@angular/core';
import {Headers, Http, URLSearchParams, RequestOptions} from '@angular/http';
import {Config} from 'config';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MsClientService {

    url: string;

    services: [{}] = window['services']; // todo move this to root route resolver

    constructor(protected Http: Http) {
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

        console.log('makeMsCall ' + action, authSessionId);

        if (method === 'GET') {
            params = new URLSearchParams();
            for (let prop in data) {
                if (data.hasOwnProperty(prop)) {
                    params.set(prop, data[prop])
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
            .then(function (response) {
                let resObj = response.json();

                return resObj.result;
            })
            .catch(this.handleError);
    }

    protected handleError(response: any) {
        if (response.status === 401) {
            return window.location.href = '/#/auth/procore'; // todo use app.router here
        }

        return Promise.reject(response.message || response);
    }

    create(data: {} | [{}], authUserSessionId: string): Promise<[number]> {
        return this.makeMsCall(
            'create',
            'POST',
            data,
            authUserSessionId
        );
    }

    update(id, data: {}, authUserSessionId: string): Promise<> {
        return this.makeMsCall(
            'update/' + id,
            'PUT',
            data,
            authUserSessionId
        );
    }

}
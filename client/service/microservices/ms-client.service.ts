import {Injectable} from '@angular/core';
import {Headers, Http, URLSearchParams, RequestOptions} from '@angular/http';
import {Config} from 'client/config';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MsClientService {

    url: string;

    services: [{}] = [];

    constructor(protected Http: Http) {
        if (!this.services.length) {
            this.getServices()
                .then(response => this.services = response.json().result)
        }
    }

    /**
     * Make http call to microservice.
     *
     * @param {String} action
     * @param {String} method GET, POST, PUT, DELETE
     * @param {} data
     * @param {String} authSessionId
     *
     * @return {Promise<{}>}
     */
    public makeMsCall(action: string, method: string, data: {} = {}, authSessionId: string = ''): Promise<[{}]> {
        console.log('this.services', this.services);

        let params, body;
        let headers = new Headers({
            'Content-Type': 'application/json',
            'auth-session-id': authSessionId,
            'ms-secure-id': Config.getEnvironmentVariable('ms-secure-id')
        });

        console.log('makeMsCall ' + action, authSessionId);

        if (method === 'GET') {
            params = new URLSearchParams();
            for (let prop in data) {
                if (data.hasOwnProperty(prop)) {
                    params.set(prop, data[prop])
                }
            }
        } else if (method === 'POST') {
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

    getServices(): Promise<> {
        console.log('getting services from ms-main');

        let headers = new Headers({
            'Content-Type': 'application/json',
            'ms-secure-id': Config.getEnvironmentVariable('ms-secure-id')
        });

        let requestOptions = new RequestOptions({
            headers: headers,
            withCredentials: true
        });

        return this.Http.get(Config.getEnvironmentVariable('ms-main-url') + '/services', requestOptions)
            .toPromise();
    }

    protected handleError(response: any) {
        if (response.status === 401) {
            return window.location.href = '/#/auth/default'; // todo use app.router here
        }

        return Promise.reject(response.message || response);
    }

}
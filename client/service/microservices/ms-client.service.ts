import {Injectable} from '@angular/core';
import {Headers, Http, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MsClientService {

    url: string;
    secureMsStr: string = 'someRandomGeneratedString123';
    callerMsName: string = 'app-ui';

    constructor(protected Http: Http) {
    }

    /**
     * Make http call to microservice.
     *
     * @todo implement POST, PUT, DELETE
     *
     * @param {String} action
     * @param {String} method GET, POST, PUT, DELETE
     * @param {} data
     * @param {String} authSessionId
     *
     * @return {Promise<{}>}
     */
    public makeMsCall(action: string, method: string, data: {} = {}, authSessionId: string = ''): Promise<[{}]> {
        let params;
        let headers = new Headers({
            'Content-Type': 'application/json',
            'auth-session-id': authSessionId
        });

        console.log('makeMsCall ' + action, authSessionId);

        if (method === 'GET') {
            params = new URLSearchParams();
            params.set('params', JSON.stringify(data));
        }

        return this.Http
            .get(this.url + action, {
                search: params,
                headers: headers,
                withCredentials: true
            })
            .toPromise()
            .then(function (response) {
                let resObj = response.json();

                return resObj.result;
            })
            .catch(this.handleError);
    }

    protected handleError(response: any) {
        if (response.status === 401) {
            return window.location.href = '/#/auth/default'; // todo use app.router here
        }

        return Promise.reject(response.message || response);
    }

}
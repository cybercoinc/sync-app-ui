import {Injectable} from '@angular/core';
import {Headers, Http, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MsClientService {

    url: string;
    secureStr: string = 'someRandomGeneratedString123';
    callerMsName: string = 'app-ui';

    constructor(protected Http: Http) {
        this.Http = Http;
    }

    protected handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    /**
     * Make http call to microservice.
     *
     * @todo implement POST, PUT, DELETE
     *
     * @param {String} action
     * @param {String} method GET, POST, PUT, DELETE
     * @param {} data
     * @return {Promise<{}>}
     */
    public makeMsCall(action: string, method: string, data: {} = {}): Promise<[{}]> {
        let params;

        if (method === 'GET') {
            params = new URLSearchParams();
            params.set('params', JSON.stringify(data));
        }

        return this.Http.get(this.url + action, {search: params})
            .toPromise()
            .then(function (response) {
                let resObj = response.json();

                if (!resObj.success) {
                    throw new Error(resObj.message);
                    // todo show errors from resObj.errors
                }

                return resObj.result;
            })
            .catch(this.handleError);
    }
}
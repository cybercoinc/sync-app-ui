import {Injectable} from '@angular/core';
import {Headers, Http, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MsClientService {

    url: string;
    secureStr: string = 'someRandomGeneratedString123';
    callerMsName: string = 'app-ui';

    protected Http: Http;

    constructor(protected Http: Http) {
        this.Http = Http;
    }

    protected handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    public makeApiCall(): {} {
        return {
            property: 'value'
        }
    }
}
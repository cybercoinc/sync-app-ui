import {MsClientService} from "./ms-client.service";
import {Headers, Http, URLSearchParams} from '@angular/http';

export class MsUserClientService extends MsClientService {

    constructor(protected Http: Http) {
        super(Http);

        this.url = this.getServiceUrl('ms-user');
    }

    getMe() {
        return this.makeMsCall('me', 'GET');
    }

    defaultAuth() {
        return this.makeMsCall('auth', 'GET');
    }

    procoreAuth() {
        return this.makeMsCall('auth/procore', 'GET');
    }

    removeSmartsheetAuth() {
        return this.makeMsCall('auth/remove/smartsheet', 'DELETE');
    }
}

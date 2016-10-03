import {MsClientService} from "./ms-client.service";
import {Headers, Http, URLSearchParams} from '@angular/http';
import {User} from 'client/entities/entities';

export class MsUserClientService extends MsClientService {

    constructor(protected Http: Http) {
        super(Http);

        this.url = this.getServiceUrl('ms-user');
    }

    getMe(): Promise<User> {
        return this.makeMsCall('me', 'GET');
    }

    defaultAuth() {
        return this.makeMsCall('auth', 'GET');
    }

    procoreAuth() {
        return this.makeMsCall('auth/procore', 'GET');
    }

    removeSmartsheetAuth(userId, authSessionId) {
        return this.makeMsCall('auth/remove/smartsheet', 'DELETE', {
            user_id: userId
        }, authSessionId);
    }
}

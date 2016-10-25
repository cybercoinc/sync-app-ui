import {MsClientService} from "./ms-client.service";
import {Headers, Http, URLSearchParams} from '@angular/http';
import {User} from 'client/entities/entities';

export class MsLicenseClientService extends MsClientService {

    constructor(protected Http: Http) {
        super(Http);

        this.url = this.getServiceUrl('ms-license');
    }

    getLicenses(userId, authUserSessionId): Promise<> {
        return this.makeMsCall('get-licenses', 'GET', {user_id: userId}, authUserSessionId);
    }

    getInvoices(userId, authUserSessionId): Promise<>  {
        return this.makeMsCall('get-invoices', 'GET', {user_id: userId}, authUserSessionId);
    }


}

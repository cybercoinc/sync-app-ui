import {MsClientService} from "./ms-client.service";
import {Headers, Http, URLSearchParams} from '@angular/http';
import {User} from 'client/entities/entities';
import {PendingRequestsService} from "../pending-requests.service";

export class MsUserClientService extends MsClientService {

    constructor(protected Http: Http, protected PendingRequestsService: PendingRequestsService) {
        super(Http, PendingRequestsService);

        this.url = this.getServiceUrl('ms-user');
    }

    getMe(): Promise<User> {
        return this.makeMsCall('me', 'GET');
    }

    getCompany(userId, authSessionId): Promise<> {
        return this.makeMsCall('get-company', 'GET', {
            userId:userId
        }, authSessionId);
    }

    updatePbr(companyId,pbrId, authSessionId): Promise<> {
        return this.makeMsCall('update-pbr', 'POST', {
            pbrId:pbrId,
            companyId:companyId
        }, authSessionId);
    }

    getCompanyUsers(companyId, authSessionId): Promise<> {
        return this.makeMsCall('get-company-users', 'GET', {
            companyId:companyId
        }, authSessionId);
    }

    defaultAuth() {
        return this.makeMsCall('auth/default', 'GET');
    }

    procoreAuth() {
        return this.makeMsCall('auth/procore', 'GET');
    }

    removeSmartsheetAuth(userId, authSessionId) {
        return this.makeMsCall('auth/remove/smartsheet', 'DELETE', {
            user_id: userId
        }, authSessionId);
    }

    logout(userId, authSessionId) {
        return this.makeMsCall('auth/logout', 'POST', {
            user_id: userId
        }, authSessionId);
    }
}

import {MsClientService} from "./ms-client.service";
import {Headers, Http, URLSearchParams} from '@angular/http';
import {User} from 'client/entities/entities';
import {PendingRequestsService} from "../pending-requests.service";
import {Router} from "@angular/router";

export class MsUserClientService extends MsClientService {

    constructor(protected Http: Http, protected PendingRequestsService: PendingRequestsService, protected router: Router) {
        super(Http, PendingRequestsService, router);

        this.url = this.getServiceUrl('ms-user');
    }

    getMe(): Promise< {user: User, auth_token_id: number}> {
        return this.makeMsCall('me', 'GET');
    }

    getCompany(userId, authTokenId): Promise<any> {
        return this.makeMsCall('get-company', 'GET', {
            userId: userId
        }, authTokenId);
    }

    updatePbr(companyId, pbrId, authTokenId): Promise<any> {
        return this.makeMsCall('update-pbr', 'POST', {
            pbrId: pbrId,
            companyId: companyId
        }, authTokenId);
    }

    getCompanyUsers(companyId, authTokenId): Promise<any> {
        return this.makeMsCall('get-company-users', 'GET', {
            companyId: companyId
        }, authTokenId);
    }

    defaultAuth() {
        return this.makeMsCall('auth/default', 'GET');
    }

    procoreAuth() {
        return this.makeMsCall('auth/procore', 'GET');
    }

    removeSmartsheetAuth(userId, authTokenId) {
        return this.makeMsCall('auth/remove/smartsheet', 'DELETE', {
            user_id: userId
        }, authTokenId);
    }

    logout(userId, authTokenId) {
        return this.makeMsCall('auth/logout', 'POST', {
            user_id: userId
        }, authTokenId);
    }
}

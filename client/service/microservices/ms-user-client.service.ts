import {MsClientService} from "./ms-client.service";
import {User} from 'client/entities/entities';
import {PendingRequestsService} from "../pending-requests.service";
import {Router} from "@angular/router";
import {Inject} from "@angular/core";
import {AuthService} from "../auth.service";
import {Headers, Http, URLSearchParams, RequestOptions} from '@angular/http';

export class MsUserClientService extends MsClientService {

    constructor(@Inject(Http) protected Http: Http,
                @Inject(PendingRequestsService) protected PendingRequestsService: PendingRequestsService,
                @Inject(Router) protected router: Router, @Inject(AuthService) protected AuthService: AuthService) {

        super(Http, PendingRequestsService, router, AuthService);

        this.url = this.getServiceUrl('ms-user');
    }

    getCompany(userId): Promise<any> {
        return this.makeMsCall('get-company', 'GET', {
            userId: userId
        });
    }

    updatePbr(companyId, pbrId): Promise<any> {
        return this.makeMsCall('update-pbr', 'POST', {
            pbrId: pbrId,
            companyId: companyId
        });
    }

    getCompanyUsers(companyId): Promise<any> {
        return this.makeMsCall('get-company-users', 'GET', {
            companyId: companyId
        });
    }

    defaultAuth() {
        return this.makeMsCall('auth/default', 'GET')
            .then(response => window.location.replace('/'));
    }

    procoreAuth() {
        return this.makeMsCall('auth/procore', 'GET');
    }

    removeSmartsheetAuth(userId) {
        return this.makeMsCall('auth/remove/smartsheet', 'DELETE', {
            user_id: userId
        });
    }

    logout(userId) {
        return this.makeMsCall('auth/logout', 'POST', {
            user_id: userId
        })
            .then(() => {
                this.AuthService.authUser = null;
            });
    }

    getProcoreAuthLink() {
        return this.url + 'auth/procore';
    }

    getSmartsheetAuthLink() {
        return this.url + 'auth/smartsheet';
    }
}

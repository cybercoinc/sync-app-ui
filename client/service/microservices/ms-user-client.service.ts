import {MsClientService} from "./ms-client.service";
import {PendingRequestsService} from "../pending-requests.service";
import {Router} from "@angular/router";
import {Inject} from "@angular/core";
import {AuthService} from "../auth.service";
import {Headers, Http, URLSearchParams, RequestOptions} from '@angular/http';
import {ConfigService} from "../config.service";
import {NotificationsService} from "../../modules/notifications/notifications.service";

export class MsUserClientService extends MsClientService {
    constructor(@Inject(Http) protected Http: Http,
                @Inject(PendingRequestsService) protected PendingRequestsService: PendingRequestsService,
                @Inject(Router) protected router: Router,
                @Inject(AuthService) protected AuthService: AuthService,
                @Inject(NotificationsService) protected NotificationsService: NotificationsService,
                @Inject(ConfigService) protected ConfigService: ConfigService,
    ) {
        super(Http, PendingRequestsService, router, AuthService, ConfigService, NotificationsService);

        this.msName = 'ms-user';
    }

    getCompany(companyId): Promise<any> {
        return this.makeMsCall('get-company', 'GET', {
            companyId: companyId
        });
    }

    updatePbr(companyId, pbrId): Promise<any> {
        return this.makeMsCall('update-pbr', 'POST', {
            pbrId: pbrId,
            companyId: companyId
        });
    }

    updateExtraBillingReceivers(companyId, extraBillingReceivers): Promise<any> {
        return this.makeMsCall('update-extra-billing-receivers', 'PUT', {
            extraBillingReceivers: extraBillingReceivers,
            companyId: companyId
        });
    }

    getCompanyUsers(companyId): Promise<any> {
        return this.makeMsCall('', 'GET', {
            companyId: companyId
        });
    }

    getCompaniesList(): Promise<any> {
        return this.makeMsCall('procore/companies', 'GET');
    }

    getAuthWithProcoreCompany(procoreCompanyId) {
        return this.makeMsCall('auth/withProcoreCompany', 'GET', {
            procoreCompanyId: procoreCompanyId
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

    /**
     * Remove microsoft auth
     * @param userId
     */
    removeMicrosoftAuth(userId) {
        return this.makeMsCall('auth/remove/microsoft', 'DELETE', {
            user_id: userId
        });
    }

    logout() {
        return this.makeMsCall('auth/user-logout', 'POST')
            .then(() => {
                this.AuthService.authUser = null;
            });
    }

    getProcoreAuthLink() {
        return this.ConfigService.getServiceUrl(this.msName) + 'auth/procore';
    }

    getSmartsheetAuthLink() {
        return this.ConfigService.getServiceUrl(this.msName) + 'auth/smartsheet';
    }

    /**
     * Get microsoft auth link
     * @param query
     */
    getMicrosoftAuthLink(query) {
        let params = new URLSearchParams();
        params.set('pwa_url', query);

        return `${this.ConfigService.getServiceUrl(this.msName)}auth/microsoft?${params.toString()}`;
    }

    getPbrProjects(userId): Promise<any> {
        return this.makeMsCall('pbr-projects', 'GET', {
            user_id: userId
        });
    }

    getCompanyPbr(companyId): Promise<any> {
        return this.makeMsCall('get-company-pbr', 'GET', {
            company_id: companyId
        });
    }

    getEmailByUserId(userId: number): Promise<string> {
        return this.makeMsCall('get-email-by-user-id', 'GET', {
            user_id: userId
        });
    }

    /**
     * Get user desktop tokens
     */
    getUserDesktopTokens(): Promise<[{}]> {
        return this.makeMsCall('user-desktop-tokens', 'GET', );
    }


    /**
     * Remove user desktop token
     * @param tokenId
     */
    removeUserDesktopToken(tokenId) {
        return this.makeMsCall(`user-desktop-tokens/${tokenId}`, 'DELETE');
    }
}

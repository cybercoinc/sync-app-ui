import {MsClientService} from "./ms-client.service";
import {Http} from '@angular/http';
import {PendingRequestsService} from "../pending-requests.service";
import {Router} from "@angular/router";

export class MsLicenseClientService extends MsClientService {

    constructor(protected Http: Http, protected PendingRequestsService: PendingRequestsService, protected router: Router) {
        super(Http, PendingRequestsService, router);

        this.url = this.getServiceUrl('ms-license');
    }

    createStartLicense(projectId: number, projectName: string, userId: number, authTokenId): Promise<number> {
        return this.makeMsCall(
            'create-start-license',
            'POST',
            {
                project_id: projectId,
                project_name: projectName,
                user_id: userId,
            },
            authTokenId
        );
    }

    getLicenses(userId, authTokenId): Promise<any> {
        return this.makeMsCall('get-licenses', 'GET', {user_id: userId}, authTokenId);
    }

    getInvoices(userId, authTokenId): Promise<any> {
        return this.makeMsCall('get-invoices', 'GET', {user_id: userId}, authTokenId);
    }

    createCustomer(userId, authTokenId): Promise<any> {
        return this.makeMsCall('create-customer', 'GET', {user_id: userId}, authTokenId);
    }
}

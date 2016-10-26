import {MsClientService} from "./ms-client.service";
import {Headers, Http, URLSearchParams} from '@angular/http';
import {User} from 'client/entities/entities';
вк
export class MsLicenseClientService extends MsClientService {

    constructor(protected Http: Http) {
        super(Http);

        this.url = this.getServiceUrl('ms-license');
    }

    createStartLicense(projectId: number, projectName: string, userId: number, authUserSessionId: string): Promise<number> {
        return this.makeMsCall(
            'create-start-license',
            'POST',
            {
                project_id: projectId,
                project_name: projectName,
                user_id: userId,
            },
            authUserSessionId
        );
    }
    getLicenses(userId, authUserSessionId): Promise<> {
        return this.makeMsCall('get-licenses', 'GET', {user_id: userId}, authUserSessionId);
    }

    getInvoices(userId, authUserSessionId): Promise<>  {
        return this.makeMsCall('get-invoices', 'GET', {user_id: userId}, authUserSessionId);
    }


}

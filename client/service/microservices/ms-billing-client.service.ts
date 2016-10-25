import {MsClientService} from "./ms-client.service";
import {Headers, Http, URLSearchParams} from '@angular/http';
import {Project} from 'client/entities/entities'

export class MsBillingClientService extends MsClientService {

    constructor(protected Http: Http) {
        super(Http);

        this.url = this.getServiceUrl('ms-billing');
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
}

import {MsClientService} from "./ms-client.service";
import {Headers, Http, URLSearchParams} from '@angular/http';

export class MsProjectClientService extends MsClientService {

    constructor(protected Http: Http) {
        super(Http);

        this.url = this.getServiceUrl('ms-project');
    }

    getActiveProjects(userId, authUserSessionId): Promise<[{}]> {
        return this.makeMsCall(
            'find-where',
            'GET',
            {
                status: 'active',
                user_fk_id: userId
            },
            authUserSessionId
        );
    }

    getProcoreProjects(userId, authUserSessionId): Promise<[{}]> {
        return this.makeMsCall(
            'get-procore-projects',
            'GET',
            {
                user_id: userId
            },
            authUserSessionId
        );
    }

    getSmartsheetProjects(userId, authUserSessionId): Promise<[{}]> {
        return this.makeMsCall(
            'get-smartsheet-projects',
            'GET',
            {
                user_id: userId
            },
            authUserSessionId
        );
    }

    createProject(data: {}, authUserSessionId: string): Promise<[{}]> {
        return this.makeMsCall(
            'create-project',
            'POST',
            {
                params: data
            },
            authUserSessionId
        );
    }

    createSmartsheetWorkspace(data: {workspaceName: string, projectId: number},  authUserSessionId: string): Promise<[{}]> {
        return this.makeMsCall(
            'create-smartsheet-workspace',
            'POST',
            data,
            authUserSessionId
        );
    }
}

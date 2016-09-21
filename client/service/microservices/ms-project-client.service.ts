import {MsClientService} from "./ms-client.service";

export class MsProjectClientService extends MsClientService {
    url = 'http://localhost:3003';

    getActiveProjects(userId, authUserSessionId): Promise<[{}]> {
        return this.makeMsCall(
            '/find-where',
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
            '/get-procore-projects',
            'GET',
            {
                user_id: userId
            },
            authUserSessionId
        );
    }

    getSmartsheetProjects(userId, authUserSessionId): Promise<[{}]> {
        return this.makeMsCall(
            '/get-smartsheet-projects',
            'GET',
            {
                user_id: userId
            },
            authUserSessionId
        );
    }

    createProject(data: {}, authUserSessionId: string): Promise<[{}]> {
        return this.makeMsCall(
            '/create-project',
            'POST',
            {
                params: data
            },
            authUserSessionId
        );
    }
}

import {MsClientService} from "./ms-client.service";

export class MsProjectClientService extends MsClientService {
    url = 'http://localhost:3003';

    getActiveProjects(authUserId, authUserSessionId): Promise<[{}]> {
        return this.makeMsCall(
            '/find-where',
            'GET',
            {
                status: 'active',
                user_fk_id: authUserId
            },
            authUserSessionId
        );
    }

    getProcoreProjects(authUserId, authUserSessionId): Promise<[{}]> {
        return this.makeMsCall(
            '/get-procore-projects',
            'GET',
            {
                user_id: authUserId
            },
            authUserSessionId
        );
    }

}

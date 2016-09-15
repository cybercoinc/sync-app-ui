import {MsClientService} from "./ms-client.service";

export class MsProjectClientService extends MsClientService {
    url = 'http://localhost:3003';

    getActiveProjects(authUserId, authUserSessionKey): Promise<[{}]> {
        return this.makeMsCall(
            '/find-where',
            'GET',
            {
                status: 'active',
                user_id: authUserId
            },
            authUserSessionKey
        );
    }

}

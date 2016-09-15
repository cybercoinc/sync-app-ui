import {MsClientService} from "./ms-client.service";

export class MsProjectClientService extends MsClientService {
    url = 'http://localhost:3003';

    getActiveProjects(authUserSessionKey): Promise<[{}]> {
        return this.makeMsCall(
            '/find-where',
            'GET',
            {status: 'active'},
            authUserSessionKey
        );
    }

}

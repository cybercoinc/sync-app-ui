import {MsClientService} from "./ms-client.service";

export class MsMainClientService extends MsClientService {
    url = window.config? window.config.ms_main_url : null;

    getServices(userId, authUserSessionId): Promise<[{}]> {
        return this.makeMsCall(
            '/services',
            'GET',
            {},
            authUserSessionId
        );
    }
}

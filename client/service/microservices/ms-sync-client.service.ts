import {MsClientService} from "./ms-client.service";
import {Headers, Http, URLSearchParams} from '@angular/http';

export class MsSyncClientService extends MsClientService {

    constructor(protected Http: Http) {
        super(Http);

        this.url = this.getServiceUrl('ms-sync');
    }

    getSyncSessionsByProjectId(projectId: number, authUserSessionId: string): Promise<[{}]> {
        return this.makeMsCall(
            'sync-sessions',
            'GET',
            {
                id: projectId
            },
            authUserSessionId
        );
    }
}

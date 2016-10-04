import {MsClientService} from "./ms-client.service";
import {Headers, Http, URLSearchParams} from '@angular/http';
import {SyncSession, ItemChanges} from 'client/entities/entities'

export class MsSyncClientService extends MsClientService {

    constructor(protected Http: Http) {
        super(Http);

        this.url = this.getServiceUrl('ms-sync');
    }

    getSyncSessionsByProjectId(projectId: number, authUserSessionId: string): Promise<[SyncSession]> {
        return this.makeMsCall(
            'sync-sessions',
            'GET',
            {
                id: projectId
            },
            authUserSessionId
        );
    }

    getItemChangesBySyncSessionsId(syncSessionId: number, authUserSessionId: string): Promise<[ItemChanges]> {
        return this.makeMsCall(
            'item-changes-by-sync-session-id',
            'GET',
            {
                sync_session_id: syncSessionId
            },
            authUserSessionId
        );
    }
}

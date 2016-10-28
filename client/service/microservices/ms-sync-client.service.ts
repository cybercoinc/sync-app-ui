import {MsClientService} from "./ms-client.service";
import {Headers, Http, URLSearchParams} from '@angular/http';
import {SyncSession, ItemChanges, ProcoreTodoColumn} from 'client/entities/entities'

export class MsSyncClientService extends MsClientService {

    constructor(protected Http: Http) {
        super(Http);

        this.url = this.getServiceUrl('ms-sync');
    }

    getProjectSyncSessions(projectId: number, authUserSessionId: string): Promise<[SyncSession]> {
        return this.makeMsCall(
            'sync-sessions',
            'GET',
            {
                ancestors_path: ['project', projectId]
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

    startPipeSync(pipeId: number, authUserSessionId: string): Promise<boolean> {
        return this.makeMsCall(
            'start-pipe-sync',
            'GET',
            {
                pipe_id: pipeId
            },
            authUserSessionId
        );
    }

    getProcoreTodosColumns(authUserSessionId: string): Promise<[ProcoreTodoColumn]> {
        return this.makeMsCall(
            'get-procore-todos-columns',
            'GET',
            {},
            authUserSessionId
        )
    }
}

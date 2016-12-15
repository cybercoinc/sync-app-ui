import {MsClientService} from "./ms-client.service";
import {Headers, Http, URLSearchParams} from '@angular/http';
import {SyncSession, ItemChanges, ProcoreTodoColumn} from 'client/entities/entities'
import {PendingRequestsService} from "../pending-requests.service";
import {Router} from "@angular/router";

export class MsSyncClientService extends MsClientService {

    constructor(protected Http: Http, protected PendingRequestsService: PendingRequestsService, protected router: Router) {
        super(Http, PendingRequestsService, router);

        this.url = this.getServiceUrl('ms-sync');
    }

    getLastPipeSyncSessions(pipeId: number, onlyWithChanges: boolean, authTokenId): Promise<SyncSession[]> {
        return this.makeMsCall(
            'last-sync-sessions',
            'GET',
            {
                pipe_id: pipeId,
                only_with_changes: onlyWithChanges
            },
            authTokenId
        );
    }

    getItemChangesBySyncSessionsId(syncSessionId: number, authTokenId): Promise<[ItemChanges]> {
        return this.makeMsCall(
            'item-changes-by-sync-session-id',
            'GET',
            {
                sync_session_id: syncSessionId
            },
            authTokenId
        );
    }

    startPipeSync(pipeId: number, authTokenId): Promise<boolean> {
        return this.makeMsCall(
            'start-pipe-sync',
            'GET',
            {
                pipe_id: pipeId
            },
            authTokenId
        );
    }

    getProcoreTodosColumns(authTokenId): Promise<[ProcoreTodoColumn]> {
        return this.makeMsCall(
            'get-procore-todos-columns',
            'GET',
            {},
            authTokenId
        )
    }
}

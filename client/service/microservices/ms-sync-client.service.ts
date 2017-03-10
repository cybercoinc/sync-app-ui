import {MsClientService} from "./ms-client.service";
import {Headers, Http, URLSearchParams} from '@angular/http';
import {SyncSession, ItemChanges, ProcoreTodoColumn} from 'client/entities/entities'
import {PendingRequestsService} from "../pending-requests.service";
import {Router} from "@angular/router";
import {Inject} from "@angular/core";
import {AuthService} from "../auth.service";
import {ConfigService} from "../config.service";

export class MsSyncClientService extends MsClientService {
    constructor(@Inject(Http) protected Http: Http,
                @Inject(PendingRequestsService) protected PendingRequestsService: PendingRequestsService,
                @Inject(Router) protected router: Router,
                @Inject(AuthService) protected AuthService: AuthService,
                @Inject(ConfigService) protected ConfigService: ConfigService,
    ) {
        super(Http, PendingRequestsService, router, AuthService, ConfigService);

        this.msName = 'ms-sync';
    }

    getLastPipeSyncSessions(filter: any): Promise<SyncSession[]> {
        return this.makeMsCall(
            'last-sync-sessions',
            'GET',
            {
                pipe_fk_id: filter.pipe_fk_id,
                has_item_changes: filter.has_item_changes,
                status: filter.status
            }
        );
    }

    getItemChangesBySyncSessionsId(syncSessionId: number): Promise<[ItemChanges]> {
        return this.makeMsCall(
            'item-changes-by-sync-session-id',
            'GET',
            {
                sync_session_id: syncSessionId
            }
        );
    }

    getProcoreTodosColumns(pipeType: string): Promise<[ProcoreTodoColumn]> {
        return this.makeMsCall(
            'get-procore-todos-columns',
            'GET',
            {
                pipe_type: pipeType
            }
        )
    }

    saveChartTasks(pipeId, tasks): Promise<any> {
        return this.makeMsCall(
            'process-gantt-chart-webhook',
            'POST',
            {
                pipe_id: pipeId,
                tasks:   tasks
            }
        )
    }
}

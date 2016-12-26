import {Component, OnInit} from "@angular/core";

import 'rxjs/add/operator/filter';

import {Router, ActivatedRoute} from '@angular/router';

import {MsSyncClientService} from 'client/service/microservices/ms-sync-client.service';
import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {PipeConnectionService} from 'client/service/pipe-connection.service';
import {AuthService} from 'client/service/auth.service';

import {SyncSession, ProjectPipe} from 'client/entities/entities';

@Component({
    selector: 'sync-sessions-list',
    templateUrl: 'client/modules/projects/sync-sessions/list/sync-sessions-list.component.html'
})
export class SyncSessionsListComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService,
                protected PipeConnectionService: PipeConnectionService,
                protected ActivatedRoute: ActivatedRoute,
                protected AuthService: AuthService,
                protected Router: Router,
                protected MsSyncClientService: MsSyncClientService) {
    }

    private sub: any;

    pipeType: string;
    projectId: number;

    syncSessionsList: SyncSession[] = null;
    projectPipe: ProjectPipe;

    protected onlyWithChanges: boolean = true;

    ngOnInit() {
        this.ActivatedRoute.parent.params.forEach((params) => {
            this.projectId = +params['project_id'];
        });

        this.sub = this.ActivatedRoute.params.subscribe(params => {
            this.pipeType = params['pipe_type'];

            this.getSyncSessionsList(this.projectId, this.pipeType);
        });
    }

    getSyncSessionsList(projectId, pipeType) {
        this.syncSessionsList = null;

        return this.MsProjectClientService.getPipesWhere({
            type: pipeType,
            project_fk_id: projectId
        })
            .then((pipesList) => {
                this.projectPipe = pipesList.shift();

                if (!this.projectPipe) {
                    return [];
                }

                return this.MsSyncClientService.getLastPipeSyncSessions(this.projectPipe.id, this.onlyWithChanges);
            })
            .then(syncSessionsList => {
                this.syncSessionsList = this.orderByDate(syncSessionsList);

                return this.syncSessionsList;
            })
    }

    orderByDate(list: SyncSession[]) { // todo move this to some common pipe filter
        return list.sort(function (b, a) {
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        });
    }

    showOnlyWithItemChanges(onlyWithChanges) {
        this.onlyWithChanges = onlyWithChanges;
        return this.getSyncSessionsList(this.projectId, this.pipeType);
    }
}

import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/filter';

import { Router, ActivatedRoute } from '@angular/router';

import { MsSyncClientService } from 'client/service/microservices/ms-sync-client.service';
import { MsProjectClientService } from 'client/service/microservices/ms-project-client.service';
import { PipeConnectionService } from 'client/service/pipe-connection.service';
import { AuthService } from 'client/service/auth.service';

import { SyncSession, ProjectPipe } from 'client/entities/entities';

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

    protected pipeObj: ProjectPipe;

    protected filter: 'CHANGES_ONLY' | 'ALL' | 'FAILED';

    ngOnInit() {
        this.ActivatedRoute.parent.params.forEach((params) => {
            this.projectId = +params['project_id'];
        });

        let pipeId;

        // pipe_id is passed in case of document pipes
        this.ActivatedRoute.params.forEach((params) => {
            pipeId = +params['pipe_id'];
        });

        this.sub = this.ActivatedRoute.params.subscribe(params => {
            this.pipeType = params['pipe_type'];

            let whereObj = {
                type: this.pipeType,
                project_fk_id: this.projectId
            };

            if (pipeId) {
                whereObj['id'] = pipeId;
            }

            return this.MsProjectClientService.getPipesWhere(whereObj)
                .then(pipesList => {
                    this.projectPipe = pipesList.shift();

                    return this.showOnlyWithItemChanges();
                });
        });
    }

    getSyncSessionsList() {
        this.syncSessionsList = null;

        if (!this.projectPipe) {
            this.syncSessionsList = [];
        }

        let filterObj = {};

        if (this.projectPipe) {
            filterObj['pipe_fk_id'] = this.projectPipe.id;

            if (this.filter === 'CHANGES_ONLY') {
                filterObj['has_item_changes'] = true;

            } else if (this.filter === 'FAILED') {
                filterObj['status'] = 'failed';
            }
        }

        return this.MsSyncClientService.getLastPipeSyncSessions(filterObj)
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

    showOnlyWithItemChanges() {
        this.filter = 'CHANGES_ONLY';

        return this.getSyncSessionsList();
    }

    showAll() {
        this.filter = 'ALL';

        return this.getSyncSessionsList();
    }

    showFailed() {
        this.filter = 'FAILED';

        return this.getSyncSessionsList();
    }
}

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

    syncSessionsList: SyncSession[] = null;
    projectPipe: ProjectPipe;

    ngOnInit() {
        let projectId = null;

        this.ActivatedRoute.parent.params.forEach((params) => {
            projectId = +params['project_id'];
        });

        this.sub = this.ActivatedRoute.params.subscribe(params => {
            this.pipeType = params['pipe_type'];

            this.MsProjectClientService.getPipesWhere({
                type: this.pipeType,
                project_fk_id: projectId
            }, this.AuthService.authUser.auth_session_id)
                .then((pipesList) => {
                    this.projectPipe = pipesList.shift();

                    if (!this.projectPipe) {
                        return [];
                    }

                    return this.MsSyncClientService.getPipeSyncSessions(this.projectPipe.id, this.AuthService.authUser.auth_session_id);
                })
                .then(syncSessionsList => {
                    this.syncSessionsList = syncSessionsList;
                    console.log('syncSessions', syncSessionsList);
                })
        });
    }
}

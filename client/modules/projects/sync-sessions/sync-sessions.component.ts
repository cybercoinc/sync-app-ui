import {Component, OnInit} from "@angular/core";

import {MsSyncClientService} from 'client/service/microservices/ms-sync-client.service';
import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {PipeConnectionService} from 'client/service/pipe-connection.service';

import {AuthService} from 'client/service/auth.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'sync-sessions',
    templateUrl: `client/modules/projects/sync-sessions/sync-sessions.component.html`,
    styleUrls: [
        'client/modules/projects/sync-sessions/sync-sessions.component.css',
        'client/modules/projects/edit-project/edit-project.component.css'
    ]
})
export class SyncSessionsComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService,
                protected PipeConnectionService: PipeConnectionService,
                protected MsSyncClientService: MsSyncClientService,
    ) {

    }

    syncSessionsList: [{}] = null;

    ngOnInit() {
        this.pipesListObj = this.PipeConnectionService.pipesListObj;
        this.project = this.PipeConnectionService.project;

        console.log('this.pipesListObj', this.pipesListObj);

        // this.route.params.forEach((params: Params) => {
        //     let id = +params['project_id'];
        //
        //     this.MsSyncClientService.getProjectSyncSessions(id, this.AuthService.authUser.auth_session_id)
        //         .then(syncSessionsList => {
        //             this.syncSessionsList = this.orderByDate(syncSessionsList);
        //         });
        // });
    }

    orderByDate(list: [{created_at}]) { // todo move this to some common pipe filter
        return list.sort(function (b, a) {
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        });
    }

    protected pipesListObj;
    protected project;
}

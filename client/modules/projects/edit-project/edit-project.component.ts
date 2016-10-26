import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Project} from 'client/entities/entities';

import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {PipeConnectionService} from 'client/service/pipe-connection.service';
import {AuthService} from 'client/service/auth.service'

import {PIPE_STATUS_DISABLED, PIPE_STATUS_ACTIVE} from 'client/entities/entities';

@Component({
    selector: 'edit-project',
    templateUrl: 'client/modules/projects/edit-project/edit-project.component.html',
    styleUrls: ['client/modules/projects/edit-project/edit-project.component.css'],
})
export class EditProjectComponent implements OnInit {
    constructor(protected AuthService: AuthService,
                private route: ActivatedRoute,
                protected MsProjectClientService: MsProjectClientService,
                protected PipeConnectionService: PipeConnectionService) {
    }

    ngOnInit() {
        // this.PipeConnectionService.refreshPipesList()
        //     .then(() => {
        this.pipesListObj = this.PipeConnectionService.pipesListObj;
        this.project = this.PipeConnectionService.project;
        // });
    }

    protected pipesListObj;
    protected project;

    enablePipe() {
        let pipe = this.pipesListObj.public_todos ? this.pipesListObj.public_todos : null;

        if (!pipe) {
            return false;
        }

        this.MsProjectClientService.updatePipe(pipe.id, {
            status: PIPE_STATUS_ACTIVE
        }, this.AuthService.authUser.auth_session_id)
            .then(() => {
                return this.PipeConnectionService.refreshPipesList();
            });
    }

    disablePipe() {
        let pipe = this.pipesListObj.public_todos ? this.pipesListObj.public_todos : null;

        if (!pipe) {
            return false;
        }

        this.MsProjectClientService.updatePipe(pipe.id, {
            status: PIPE_STATUS_DISABLED
        }, this.AuthService.authUser.auth_session_id)
            .then(() => {
                return this.PipeConnectionService.refreshPipesList();
            });
    }
}
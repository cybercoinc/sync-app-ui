import {Component, OnInit} from "@angular/core";
import {PIPE_TYPE_TASKS} from 'client/entities/entities';

import {PipeConnectionService} from 'client/service/pipe-connection.service';
import {MsProjectClientService} from "../../../../../service/microservices/ms-project-client.service";
import {AuthService} from "../../../../../service/auth.service";

@Component({
    selector: 'smartsheet-connection-tasks',
    templateUrl: 'client/modules/projects/edit-project/components/pipe-tasks/smartsheet-connection-tasks.component.html',
    styles: [`
        md-card {
            background-color: #fcf8e3;
        }
    `]
})
export class SmartsheetConnectionTasksComponent implements OnInit {
    constructor(protected PipeConnectionService:  PipeConnectionService,
                protected MsProjectClientService: MsProjectClientService,
                protected AuthService:            AuthService) {
    }

    ngOnInit() {
        if (!this.PipeConnectionService.pipesListObj.hasOwnProperty('tasks')) {
            this.MsProjectClientService.getTasks(this.AuthService.authUser.id, this.PipeConnectionService.project.id)
                .then(tasks => {
                    if (tasks.length > 0) {
                        this.procoreProjectId = this.PipeConnectionService.project.procore_project_id;
                        this.isShowAlert = true;
                    }
                });
        }
    }

    protected procoreProjectId: number;
    protected isShowAlert: boolean = false;
    protected pipeType = PIPE_TYPE_TASKS;
    protected redirectRoute = ['projects', this.PipeConnectionService.project.id, 'edit-project', 'pipe-tasks', 'settings'];
}

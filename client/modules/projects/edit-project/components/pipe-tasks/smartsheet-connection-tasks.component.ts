import {Component, OnInit} from "@angular/core";
import {PIPE_TYPE_TASKS, ProjectPipe} from 'client/entities/entities';

import {PipeConnectionService} from 'client/service/pipe-connection.service';
import {MsProjectClientService} from "../../../../../service/microservices/ms-project-client.service";
import {AuthService} from "../../../../../service/auth.service";
import {Router} from "@angular/router";

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
    constructor(protected PipeConnectionService: PipeConnectionService,
                protected MsProjectClientService: MsProjectClientService,
                private router: Router,
                protected AuthService: AuthService) {
    }

    ngOnInit() {
        this.pipesListObj = this.PipeConnectionService.pipesListObj;

        if (!this.PipeConnectionService.pipesListObj.hasOwnProperty('tasks')) {
            this.MsProjectClientService.getTasks(this.AuthService.authUser.id, this.PipeConnectionService.project.id)
                .then(tasks => {
                    if (tasks.length > 0) {
                        this.procoreProjectId = this.PipeConnectionService.project.procore_project_id;
                        this.isShowAlert = true;
                    }
                });
        }

        this.scheduleChartIsUsed = this.pipesListObj[this.pipeType] && this.pipesListObj[this.pipeType].use_schedule_chart;
    }

    protected procoreProjectId: number;
    protected isShowAlert: boolean = false;

    protected componentIsBusy: boolean = false;

    protected pipesListObj = {};

    protected pipeType = PIPE_TYPE_TASKS;
    protected redirectRoute = ['projects', this.PipeConnectionService.project.id, 'edit-project', 'pipe-tasks', 'settings'];

    protected useScheduleChartIsAsked: boolean = true;
    protected scheduleChartIsUsed: boolean = false;

    protected useScheduleGantt() {
        this.componentIsBusy = true;

        return this.PipeConnectionService.createNewOrGetExistingPipe(this.pipeType, true)
            .then(() => {
                return this.PipeConnectionService.refreshPipesList();
            })
            .then(() => {
                this.scheduleChartIsUsed = true;
            });
    }

    protected doNotUseScheduleGantt() {
        if (this.componentIsBusy) {
            return;
        }

        this.scheduleChartIsUsed = false;
        this.useScheduleChartIsAsked = false;
    }
}

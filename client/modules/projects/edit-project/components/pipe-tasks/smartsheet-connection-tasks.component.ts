import {Component, OnInit} from "@angular/core";
import { PIPE_TYPE_TASKS, Project, ProjectPipe } from 'client/entities/entities';

import {PipeConnectionService} from 'client/service/pipe-connection.service';
import {MsProjectClientService} from "../../../../../service/microservices/ms-project-client.service";
import {AuthService} from "../../../../../service/auth.service";
import {Router} from "@angular/router";
import {NotificationsService} from "client/modules/notifications/notifications.service";

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
                protected NotificationsService: NotificationsService,
                private router: Router,
                protected AuthService: AuthService) {
    }

    ngOnInit() {
        this.pipesListObj = this.PipeConnectionService.pipesListObj;

        this.project = this.PipeConnectionService.project;

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
        this.useScheduleChartIsAsked = !this.pipesListObj[this.pipeType];
    }

    protected procoreProjectId: number;
    protected project: Project;
    protected isShowAlert: boolean = false;

    protected componentIsBusy: boolean = false;

    protected pipesListObj = {};

    protected pipeType = PIPE_TYPE_TASKS;
    protected redirectRoute = ['projects', this.PipeConnectionService.project.id, 'edit-project', 'pipe-tasks', 'settings'];

    protected useScheduleChartIsAsked: boolean = false;
    protected scheduleChartIsUsed: boolean = false;

    protected onSmartsheetScheduleDecisionMade(result) {
        this.scheduleChartIsUsed = result === 'gantt_chart';
        this.useScheduleChartIsAsked = false;
    }
}

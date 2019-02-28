import { Component, OnInit, Input } from '@angular/core';
import { PIPE_TYPE_PRIVATE_TODOS } from 'client/entities/entities';

import { PipeConnectionService } from 'client/service/pipe-connection.service';
import { Project } from '../../../../../entities/entities';

@Component({
    selector: 'smartsheet-connection-private',
    template: `
        <smartsheet-schedule-choose *ngIf="useScheduleChartIsAsked" [pipe-type]="pipeType"
                                    [text]="'Edit Procore\\'s Private Calendar items with:'"
                                    (decisionMade)="onSmartsheetScheduleDecisionMade($event)"></smartsheet-schedule-choose>

        <schedule-connection *ngIf="scheduleChartIsUsed" pipe-type="{{pipeType}}"
                             [redirect-route]="redirectRoute"></schedule-connection>

        <smartsheet-connection *ngIf="!useScheduleChartIsAsked && !scheduleChartIsUsed && projectType==='smartsheet'" pipe-type="{{pipeType}}"
                               [redirect-route]="redirectRoute"></smartsheet-connection>

        <pipe-settings pipe-type="{{pipeType}}" [redirect-route]="redirectRoute"></pipe-settings>

        <chart-working-days *ngIf="project && project.id && scheduleChartIsUsed"
                            [projectId]="project.id"></chart-working-days>

        <microsoft-online-connection *ngIf="!useScheduleChartIsAsked && !scheduleChartIsUsed && projectType==='microsoft-online'" pipe-type="{{pipeType}}"
                                     [redirect-route]="redirectRoute"></microsoft-online-connection>

        <microsoft-desktop-connection
                *ngIf="!useScheduleChartIsAsked && !scheduleChartIsUsed && projectType==='microsoft-desktop'"
                pipe-type="{{pipeType}}"
                (connection)="displayChooseConnection($event)">
        </microsoft-desktop-connection>

    `
})
export class SmartsheetConnectionPrivateComponent implements OnInit {
    public project: Project;

    constructor(protected PipeConnectionService: PipeConnectionService) {
    }

    ngOnInit() {
        this.pipesListObj = this.PipeConnectionService.pipesListObj;

        this.project = this.PipeConnectionService.project;

        this.scheduleChartIsUsed = this.pipesListObj[this.pipeType] && this.pipesListObj[this.pipeType].use_schedule_chart;
        this.useScheduleChartIsAsked = !this.pipesListObj[this.pipeType];

        if (this.pipesListObj[this.pipeType] && this.pipesListObj[this.pipeType].connected_to) {
            this.projectType = this.pipesListObj[this.pipeType].connected_to;
        } else {
            this.projectType = 'smartsheet';
        }
    }

    protected pipesListObj = {};
    protected pipeType = PIPE_TYPE_PRIVATE_TODOS;
    protected redirectRoute = ['projects', this.PipeConnectionService.project.id, 'edit-project', 'pipe-private-todo', 'settings-private'];
    protected projectType: String = '';


    protected useScheduleChartIsAsked: boolean = false;
    protected scheduleChartIsUsed: boolean = false;

    protected onSmartsheetScheduleDecisionMade(result) {
        if (!result) {
            this.displayChooseConnection();
            return;
        }

        this.scheduleChartIsUsed = result === 'gantt_chart';
        this.useScheduleChartIsAsked = false;
        this.projectType = result;
    }


    /**
     * Display choose connection
     */
    protected displayChooseConnection() {
        this.useScheduleChartIsAsked = true;
        this.pipeType = 'private-todo';
        this.projectType = '';
    }
}

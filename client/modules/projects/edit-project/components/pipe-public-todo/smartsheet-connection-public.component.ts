import {Component, OnInit, Input} from "@angular/core";
import {PIPE_TYPE_PUBLIC_TODOS, PIPE_STATUS_DISABLED} from 'client/entities/entities';

import {PipeConnectionService} from 'client/service/pipe-connection.service';

@Component({
    selector: 'smartsheet-connection-public',
    template: `
        <smartsheet-schedule-choose *ngIf="useScheduleChartIsAsked" [pipe-type]="pipeType" [text]="'Manage Project Calendar items with:'"
                                    (decisionMade)="onSmartsheetScheduleDecisionMade($event)"></smartsheet-schedule-choose>

        <schedule-connection *ngIf="scheduleChartIsUsed && pipesListObj[pipeType]" pipe-type="{{pipeType}}"
                             [redirect-route]="redirectRoute"></schedule-connection>

        <smartsheet-connection *ngIf="!useScheduleChartIsAsked && !scheduleChartIsUsed" pipe-type="{{pipeType}}"
                               [redirect-route]="redirectRoute"></smartsheet-connection>

        <pipe-settings pipe-type="{{pipeType}}" [redirect-route]="redirectRoute"></pipe-settings>
    `
})
export class SmartsheetConnectionPublicComponent implements OnInit {
    constructor(protected PipeConnectionService: PipeConnectionService) {
    }

    ngOnInit() {
        this.pipesListObj = this.PipeConnectionService.pipesListObj;

        this.scheduleChartIsUsed = this.pipesListObj[this.pipeType] && this.pipesListObj[this.pipeType].use_schedule_chart;
        this.useScheduleChartIsAsked = !this.pipesListObj[this.pipeType];
    }

    protected pipesListObj = {};

    protected pipeType = PIPE_TYPE_PUBLIC_TODOS;
    protected redirectRoute = ['projects', this.PipeConnectionService.project.id, 'edit-project', 'pipe-public-todo', 'settings-public'];

    protected useScheduleChartIsAsked: boolean = false;
    protected scheduleChartIsUsed: boolean = false;

    protected onSmartsheetScheduleDecisionMade(result) {
        this.scheduleChartIsUsed = result === 'gantt_chart';
        this.useScheduleChartIsAsked = false;
    }
}

import {Component, OnInit} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {PipeConnectionService} from "client/service/pipe-connection.service";
import {AuthService} from "client/service/auth.service";
import {NotificationsService} from "client/modules/notifications/notifications.service";

import {Chart} from './chart';
import {MdDialog, MdSnackBar} from "@angular/material";
import {CreateBaselineDialog} from "./create-baseline.dialog";
import {ConfigService} from "../../../service/config.service";

@Component({
    selector: 'chart',
    templateUrl: 'client/modules/projects/chart/chart.component.html',
    styleUrls:  ['client/modules/projects/chart/chart.component.css']
})
export class ChartComponent implements OnInit {
    private chart;
    private isShowToolbar    = false;
    private baselines        = [];
    private selectedBaseline = null;
    private assignees        = [];
    private isAllowEdit      = false;

    constructor(protected msProjectClient:       MsProjectClientService,
                protected PipeConnectionService: PipeConnectionService,
                protected dialog:                MdDialog,
                protected snackBar:              MdSnackBar,
                protected authService:           AuthService,
                protected configService:         ConfigService,
                protected notification:          NotificationsService) {}

    ngOnInit() {
        if (this.PipeConnectionService.pipesListObj.hasOwnProperty('tasks')) {
            Promise.all([
                this.msProjectClient.getChartData(this.PipeConnectionService.pipesListObj['tasks'].id),
                this.msProjectClient.getAssignees(this.PipeConnectionService.project.id),
                this.getResources(),
                this.msProjectClient.getUserToProjectPermissions(this.authService.authUser.id, this.PipeConnectionService.project.id),
            ])
                .then(result => {
                    let chartData = result[0],
                        assignees = result[1],
                        resources = result[2],
                        userInProject = result[3];

                    this.chart = new Chart(resources, assignees, userInProject.allow_edit_gantt_chart);

                    this.chart.setWorkingDays(this.PipeConnectionService.project.working_days, this.PipeConnectionService.project.holidays);
                    this.chart.buildChart(chartData);

                    this.isShowToolbar = true;
                    this.isAllowEdit = userInProject.allow_edit_gantt_chart;

                    if (!this.isAllowEdit) {
                        this.notification.addWarning("You don't have permissions to edit this chart");
                    }
                });

            this.msProjectClient.getBaselines(this.PipeConnectionService.pipesListObj['tasks'].id)
                .then(baselines => {
                    this.baselines = baselines;
                });
        }
    }

    getAssignees() {
        this.msProjectClient.getAssignees(this.PipeConnectionService.project.id)
            .then(assigneeList => {
                this.assignees = assigneeList;
            });
    }

    public haveNotSavedChanges(): boolean {
        return this.chart.needToSaveChanges();
    }

    getResources() {
        return Promise.all([
            this.msProjectClient.getResources(this.PipeConnectionService.project.id),
            this.msProjectClient.getTrades(this.PipeConnectionService.project.id)
        ])
            .then(results => {
                let resourcesList = results[0],
                    tradesList    = results[1],
                    result        = [];

                resourcesList.forEach(resource => {
                    result.push({
                        id:   resource.id,
                        name: resource.name
                    });
                });

                tradesList.forEach(trade => {
                    result.push({
                        id:   trade.id,
                        name: trade.name
                    });
                });

                return result;
            })
    }

    createBaseline() {
        let dialogRef = this.dialog.open(CreateBaselineDialog);

        dialogRef.afterClosed().subscribe(result => {
            if (result != 'close') {
                let dialogFormData = result,
                    baselineData   = {
                        tasks:   this.filterTasks(),
                        name:    dialogFormData.title,
                        pipe_id: this.PipeConnectionService.pipesListObj['tasks'].id
                    };

                this.msProjectClient.createBaseline(baselineData)
                    .then(baselines => {
                        this.baselines = baselines;
                    });
            }
        });
    }

    applyBaseline() {
        let baseline = this.baselines.find(item => item.id == this.selectedBaseline);
        this.chart.applyBaseline(baseline.tasks);
    }

    save() {
        let tasks = this.chart.getTasks(),
            links = this.chart.getLinks();

        this.msProjectClient.saveScheduleGantt(
            this.PipeConnectionService.pipesListObj['tasks'].id,
            tasks,
            links
        )
            .then(() => {
                this.snackBar.open('Chart has been successfully saved', null, {
                    duration: 2000,
                    extraClasses: ['alert-success']
                });
                this.chart.refreshData();
            });
    }

    exportToPdf() {
        let serverUrl = this.configService.getConfig('CHART_EXPORT_ENDPOINT');

        this.chart.exportToPdf(serverUrl);
    }

    private filterTasks() {
        let tasks = this.chart.getTasks();

        return tasks.map(task => {
            return {
                id:         task.id,
                start_date: task.start_date,
                end_date:   task.end_date,
            };
        });
    }
}

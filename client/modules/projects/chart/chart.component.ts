import {Component, OnInit} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {PipeConnectionService} from "client/service/pipe-connection.service";

import {Chart} from './chart';
import {MdDialog} from "@angular/material";
import {CreateBaselineDialog} from "./create-baseline.dialog";

@Component({
    selector: 'chart',
    templateUrl: 'client/modules/projects/chart/chart.component.html',
    styleUrls:  ['client/modules/projects/chart/chart.component.css']
})
export class ChartComponent implements OnInit {
    private chart            = new Chart();
    private isShowToolbar    = false;
    private baselines        = [];
    private selectedBaseline = null;

    constructor(protected msProjectClient:       MsProjectClientService,
                protected PipeConnectionService: PipeConnectionService,
                protected dialog:                MdDialog) {}

    ngOnInit() {
        if (this.PipeConnectionService.pipesListObj.hasOwnProperty('tasks')) {
            this.msProjectClient.getChartData(this.PipeConnectionService.pipesListObj['tasks'].id)
                .then(response => {
                    this.chart.buildChart(response);
                    this.isShowToolbar = true;
                });

            this.msProjectClient.getBaselines(this.PipeConnectionService.pipesListObj['tasks'].id)
                .then(baselines => {
                    this.baselines = baselines;
                });
        }
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
        let tasks = this.chart.getTasks();

        this.msProjectClient.saveChartTasks(this.PipeConnectionService.pipesListObj['tasks'].id, tasks);
    }

    exportToPdf() {
        this.chart.exportToPdf();
    }

    private filterTasks() {
        let tasks = this.chart.getTasks();

        return tasks.map(task => {
            return {
                id:         task.id,
                start_date: task.start_datetime,
                end_date:   task.finish_datetime,
            };
        });
    }
}

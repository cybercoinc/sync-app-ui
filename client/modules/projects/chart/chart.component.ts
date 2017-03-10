import {Component, OnInit} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {PipeConnectionService} from "client/service/pipe-connection.service";
import {MsSyncClientService} from "client/service/microservices/ms-sync-client.service";

import {Chart} from './chart';

@Component({
    selector: 'chart',
    templateUrl: 'client/modules/projects/chart/chart.component.html',
    styleUrls:  ['client/modules/projects/chart/chart.component.css']
})
export class ChartComponent implements OnInit {
    private chart   = new Chart();
    private isShowToolbar = false;

    constructor(protected msProjectClient:       MsProjectClientService,
                protected msSyncClient:          MsSyncClientService,
                protected PipeConnectionService: PipeConnectionService) {}

    ngOnInit() {
        if (this.PipeConnectionService.pipesListObj.hasOwnProperty('tasks')) {
            this.msProjectClient.getChartData(this.PipeConnectionService.pipesListObj['tasks'].id)
                .then(response => {
                    if (response.items.length > 0) {
                       this.chart.buildChart(response.items, response.users);
                       this.isShowToolbar = true;
                    }
                });
        }
    }

    exportToPdf() {
        this.chart.exportToPdf();
    }

    save() {
        let tasks = this.chart.getTasks();

        this.msSyncClient.saveChartTasks(this.PipeConnectionService.pipesListObj['tasks'].id, tasks);
    }
}

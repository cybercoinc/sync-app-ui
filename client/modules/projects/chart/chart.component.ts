import {Component, OnInit} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {PipeConnectionService} from "client/service/pipe-connection.service";

import {Chart} from './chart';

@Component({
    selector: 'chart',
    templateUrl: 'client/modules/projects/chart/chart.component.html',
    styleUrls:  ['client/modules/projects/chart/chart.component.css']
})
export class ChartComponent implements OnInit {
    private chart = new Chart();

    constructor(protected msProjectClient:       MsProjectClientService,
                protected PipeConnectionService: PipeConnectionService) {}

    ngOnInit() {
        if (this.PipeConnectionService.pipesListObj.hasOwnProperty('tasks')) {
            this.msProjectClient.getChartData(this.PipeConnectionService.pipesListObj['tasks'].id)
                .then(response => {
                    if (response.length > 0) {
                       this.chart.buildChart(response)
                    }
                });
        }
    }
}

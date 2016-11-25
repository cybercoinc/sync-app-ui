import {Component, OnInit} from "@angular/core";
import {PIPE_TYPE_TASKS} from 'client/entities/entities';

import {PipeConnectionService} from 'client/service/pipe-connection.service';

@Component({
    selector: 'smartsheet-connection-tasks',
    template: '<smartsheet-connection pipe-type="{{pipeType}}" [redirect-route]="redirectRoute"></smartsheet-connection>'
})
export class SmartsheetConnectionTasksComponent implements OnInit {
    constructor(protected PipeConnectionService: PipeConnectionService) {
    }

    ngOnInit() {

    }

    protected pipeType = PIPE_TYPE_TASKS;
    protected redirectRoute = ['projects', this.PipeConnectionService.project.id, 'edit-project', 'pipe-tasks', 'settings'];
}

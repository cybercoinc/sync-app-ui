import {Component, OnInit} from "@angular/core";
import {PIPE_TYPE_TASKS} from 'client/entities/entities';

import {PipeConnectionService} from 'client/service/pipe-connection.service';

@Component({
    selector: 'pipe-settings-tasks',
    template: '<pipe-settings pipe-type="{{pipeType}}" [redirect-route]="redirectRoute"></pipe-settings>'
})
export class PipeSettingsTasksComponent implements OnInit {
    constructor(protected PipeConnectionService: PipeConnectionService) {
    }

    ngOnInit() {

    }

    protected pipeType = PIPE_TYPE_TASKS;
    protected redirectRoute = ['projects', this.PipeConnectionService.project.id, 'edit-project', 'pipe-tasks', 'settings'];
}

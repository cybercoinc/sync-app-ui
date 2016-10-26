import {Component, OnInit, Input} from "@angular/core";
import {PIPE_TYPE_PRIVATE_TODOS} from 'client/entities/entities';

import {PipeConnectionService} from 'client/service/pipe-connection.service';

@Component({
    selector: 'pipe-settings-private',
    template: '<pipe-settings pipe-type="{{pipeType}}" [redirect-route]="redirectRoute"></pipe-settings>'
})
export class PipeSettingsPrivateComponent implements OnInit {
    constructor(protected PipeConnectionService: PipeConnectionService) {
    }

    ngOnInit() {

    }

    // todo move this properties to route later
    protected pipeType = PIPE_TYPE_PRIVATE_TODOS;
    protected redirectRoute = ['projects', this.PipeConnectionService.project.id, 'edit-project', 'pipe-private-todo', 'settings-private'];
}

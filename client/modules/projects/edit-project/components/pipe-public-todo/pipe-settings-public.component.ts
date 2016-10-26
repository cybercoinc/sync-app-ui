import {Component, OnInit, Input} from "@angular/core";
import {PIPE_TYPE_PUBLIC_TODOS, PIPE_STATUS_DISABLED} from 'client/entities/entities';

import {PipeConnectionService} from 'client/service/pipe-connection.service';

@Component({
    selector: 'pipe-settings-public',
    template: '<pipe-settings pipe-type="{{pipeType}}" [redirect-route]="redirectRoute"></pipe-settings>'
})
export class PipeSettingsPublicComponent implements OnInit {
    constructor(protected PipeConnectionService: PipeConnectionService) {
    }

    ngOnInit() {

    }

    // todo move this properties to route later
    protected pipeType = PIPE_TYPE_PUBLIC_TODOS;
    protected redirectRoute = ['projects', this.PipeConnectionService.project.id, 'edit-project', 'pipe-public-todo', 'settings-public'];
}

import {Component, OnInit, Input} from "@angular/core";
import {PIPE_TYPE_PUBLIC_TODOS, PIPE_STATUS_DISABLED} from 'client/entities/entities';

import {PipeConnectionService} from 'client/service/pipe-connection.service';

@Component({
    selector: 'smartsheet-connection-public',
    template: `<smartsheet-connection pipe-type="{{pipeType}}" [redirect-route]="redirectRoute"></smartsheet-connection>`
})
export class SmartsheetConnectionPublicComponent implements OnInit {
    constructor(protected PipeConnectionService: PipeConnectionService) {
    }

    ngOnInit() {
        this.pipesListObj = this.PipeConnectionService.pipesListObj;
    }

    protected pipesListObj = {};

    protected pipeType = PIPE_TYPE_PUBLIC_TODOS;
    protected redirectRoute = ['projects', this.PipeConnectionService.project.id, 'edit-project', 'pipe-public-todo', 'settings-public'];
}

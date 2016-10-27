import {Component, OnInit, Input} from "@angular/core";
import {PIPE_TYPE_PRIVATE_TODOS} from 'client/entities/entities';

import {PipeConnectionService} from 'client/service/pipe-connection.service';

@Component({
    selector: 'smartsheet-connection-private',
    template: '<smartsheet-connection pipe-type="{{pipeType}}" [redirect-route]="redirectRoute"></smartsheet-connection>'
})
export class SmartsheetConnectionPrivateComponent implements OnInit {
    constructor(protected PipeConnectionService: PipeConnectionService) {
    }

    ngOnInit() {

    }

    protected pipeType = PIPE_TYPE_PRIVATE_TODOS;
    protected redirectRoute = ['projects', this.PipeConnectionService.project.id, 'edit-project', 'pipe-private-todo', 'settings-private'];
}
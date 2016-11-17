import {Component, OnInit, Input} from "@angular/core";
import {PipeConnectionService} from "client/service/pipe-connection.service";

@Component({
    selector: 'status-row',
    templateUrl: 'client/modules/projects/edit-project/components/shared/status-row/status-row.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/shared/status-row/status-row.component.css',
        'client/modules/projects/edit-project/edit-project.component.css'
    ]
})
export class StatusRowComponent implements OnInit {

    constructor(protected PipeConnectionService: PipeConnectionService) {
    }

    ngOnInit() {
        this.pipesListObj = this.PipeConnectionService.pipesListObj;
        console.log(this.pipeType);
        console.log(this.pipesListObj);
    }

    @Input('pipe-type') pipeType: 'public_todos' | 'private_todos' | 'tasks';
    protected pipesListObj;
}
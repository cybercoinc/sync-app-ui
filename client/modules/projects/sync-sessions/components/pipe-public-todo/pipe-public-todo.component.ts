import {Component, OnInit, Input} from "@angular/core";

@Component({
    selector: 'sync-sessions-pipe-public-todo',
    templateUrl: 'client/modules/projects/sync-sessions/components/pipe-public-todo/pipe-public-todo.component.html',
    styleUrls: [
        'client/modules/projects/sync-sessions/sync-sessions.component.css'
    ],
})
export class SyncSessionsPipePublicTodoComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        // this.pipesListObj = this.PipeConnectionService.pipesListObj;
    }
}

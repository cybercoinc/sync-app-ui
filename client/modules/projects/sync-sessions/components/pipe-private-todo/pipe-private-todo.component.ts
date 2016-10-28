import {Component, OnInit, Input} from "@angular/core";

@Component({
    selector: 'sync-sessions-pipe-private-todo',
    templateUrl: 'client/modules/projects/sync-sessions/components/pipe-private-todo/pipe-private-todo.component.html',
    styleUrls: [
        'client/modules/projects/sync-sessions/sync-sessions.component.css'
    ],
})
export class SyncSessionsPipePrivateTodoComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        // this.pipesListObj = this.PipeConnectionService.pipesListObj;
    }
}

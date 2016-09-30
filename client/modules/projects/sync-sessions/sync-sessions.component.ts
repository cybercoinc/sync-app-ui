import {Component, OnInit} from "@angular/core";

@Component({
    selector: "sync-sessions",
    templateUrl: `client/modules/projects/sync-sessions/sync-sessions.component.html`,
    styleUrls: ['client/modules/projects/sync-sessions/sync-sessions.component.css']
})
export class SyncSessionsComponent implements OnInit {
    constructor() {

    }

    ngOnInit() {
        console.log('sync sessions');
    }
}

import {Component, OnInit, Input} from "@angular/core";

import {MsSyncClientService} from 'client/service/microservices/ms-sync-client.service';

import {SyncSession} from 'client/entities/entities';

@Component({
    selector: 'sync-session-row',
    templateUrl: 'client/modules/projects/sync-sessions/sync-session-row/sync-session-row.component.html',
    styleUrls: ['client/modules/projects/sync-sessions/sync-session-row/sync-session-row.component.css']
})
export class SyncSessionRowComponent implements OnInit {

    constructor(protected MsSyncClientService: MsSyncClientService) {
    }

    ngOnInit() {
        console.log('sync row init');
    }

    @Input('sync-session') syncSession: SyncSession;

    getStatusLabel() {
        return this.syncSession.status.charAt(0).toUpperCase() + this.syncSession.status.slice(1);
    }

    getStartedByLabel() {
        return this.syncSession.started_by.charAt(0).toUpperCase() + this.syncSession.started_by.slice(1);
    }

    getTotalTime() {
        let d2 = new Date().setTime(+this.syncSession.finished_at);
        let d1 = new Date().setTime(+this.syncSession.started_at);

        let diff = d2 - d1;

        return new Date().setTime(diff);
    }

    protected isExpanded: boolean = false;

    rowExpand() {
        this.isExpanded = !this.isExpanded;
    }
}

import {Component, OnInit, Input} from "@angular/core";

import {MsSyncClientService} from 'client/service/microservices/ms-sync-client.service';

import {SyncSession} from 'client/entities/entities';

@Component({
    selector: 'sync-session-row',
    templateUrl: 'client/modules/projects/sync-sessions/sync-session-row/sync-session-row.component.html',
})
export class SyncSessionRowComponent implements OnInit {

    constructor(protected MsSyncClientService: MsSyncClientService) {
    }

    ngOnInit() {
    }

    @Input('sync-session') syncSession: SyncSession;
}

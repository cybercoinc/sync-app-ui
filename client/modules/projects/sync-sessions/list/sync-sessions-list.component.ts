import {Component, OnInit} from "@angular/core";

import {MsSyncClientService} from 'client/service/microservices/ms-sync-client.service';
import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {PipeConnectionService} from 'client/service/pipe-connection.service';

@Component({
    selector: 'sync-sessions-list',
    templateUrl: 'client/modules/projects/sync-sessions/list/sync-sessions-list.component.html'
})
export class SyncSessionsListComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService,
                protected PipeConnectionService: PipeConnectionService,
                protected MsSyncClientService: MsSyncClientService,
    ) {

    }

    syncSessionsList: [{}] = null;

    ngOnInit() {
    }

}

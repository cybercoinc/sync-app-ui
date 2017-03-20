import {Component, OnInit, Input} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {AuthService} from 'client/service/auth.service';
import {PipeConnectionService} from 'client/service/pipe-connection.service';

import {Router, ActivatedRoute} from '@angular/router';
import {SmartsheetSheet, PIPE_TYPE_TASKS} from 'client/entities/entities';
import {PendingRequestsService} from "client/service/pending-requests.service";
import {ConfigService} from "client/service/config.service";

@Component({
    selector: 'schedule-connection',
    templateUrl: 'client/modules/projects/edit-project/components/shared/schedule-connection/schedule-connection.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/shared/schedule-connection/schedule-connection.component.css',
        'client/modules/projects/edit-project/edit-project.component.css',
    ],
})
export class ScheduleConnectionComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService,
                protected AuthService: AuthService,
                protected PipeConnectionService: PipeConnectionService,
                protected PendingRequestsService: PendingRequestsService,
                private route: ActivatedRoute,
                private ConfigService: ConfigService,
                private router: Router) {
    }

    @Input('pipe-type') pipeType: 'public_todos' | 'private_todos' | 'tasks';
    @Input('redirect-route') redirectRoute;

    ngOnInit() {
        this.PipeConnectionService.refreshPipesList();

        this.pipesListObj = this.PipeConnectionService.pipesListObj;
    }

    protected pipesListObj;
}

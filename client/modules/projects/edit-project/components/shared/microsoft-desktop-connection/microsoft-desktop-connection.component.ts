import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { MsProjectClientService } from 'client/service/microservices/ms-project-client.service';
import { AuthService } from 'client/service/auth.service';
import { PipeConnectionService } from 'client/service/pipe-connection.service';
import { MsMainClientService } from 'client/service/microservices/ms-main-client.service';

import { PendingRequestsService } from 'client/service/pending-requests.service';

@Component({
    selector: 'microsoft-desktop-connection',
    templateUrl: 'client/modules/projects/edit-project/components/shared/microsoft-desktop-connection/microsoft-desktop-connection.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/edit-project.component.css'
    ]
})
export class MicrosoftDesktopConnectionComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService,
                protected AuthService: AuthService,
                protected PipeConnectionService: PipeConnectionService,
                protected PendingRequestsService: PendingRequestsService,
                protected MsMainClientService: MsMainClientService) {
    }

    @Input('pipe-type') pipeType: 'public_todos' | 'private_todos' | 'tasks';
    @Input('redirect-route') redirectRoute;

    private isShowAlert: boolean = false;
    private microsoftDesktopUrl = null;



    ngOnInit() {
        if (this.PipeConnectionService.pipesListObj[this.pipeType].connected_to === 'microsoft-desktop') {
            this.MsMainClientService.getAppSettings().then(response => {
                if (response) {
                    response.forEach(item => {
                        if (item.name === 'microsoft_desktop_url') {
                            this.microsoftDesktopUrl = item.value.status;
                        }
                    })
                }
            });
        }
    }

    cancelConnection() {
        return this.connection.emit(false);
    }

    confirmConnection(columnsObj): boolean | Promise<any> {
        if (this.PendingRequestsService.hasPendingRequest) {
            return false;
        }

        return this.PipeConnectionService.createNewOrGetExistingPipe(
            this.pipeType,
            false,
            {
                connected_to: 'microsoft-desktop',
                need_to_match_ms_project_columns: false,
            })
            .then(() => {
                return this.PipeConnectionService.refreshPipesList();
            });
    }

    @Output() connection = new EventEmitter();
}

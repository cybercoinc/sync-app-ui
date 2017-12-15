import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'client/service/auth.service';
import { MsProjectClientService } from 'client/service/microservices/ms-project-client.service';

@Component({
    selector: 'procore-webhook',
    templateUrl: 'client/modules/projects/edit-project/components/project-settings/procore-webhook/procore-webhook.component.html',
    styleUrls: ['client/modules/projects/edit-project/components/project-settings/procore-webhook/procore-webhook.component.css']
})
export class ProcoreWebhookComponent implements OnInit {
    @Input() projectId: number;

    protected webhookEnabled: boolean;

    constructor(protected AuthService: AuthService,
                protected msProjectsService: MsProjectClientService,) {
    }

    ngOnInit() {
        return this.msProjectsService.checkIfProcoreWebhookEnabled(this.projectId)
            .then(webhookEnabled => {
                this.webhookEnabled = webhookEnabled;
            });
    }

    disable() {
        return this.msProjectsService.removeProcoreProjectWebhook(this.projectId)
            .then(() => {
                this.webhookEnabled = false;
            });
    }

    enable() {
        return this.msProjectsService.createProcoreProjectWebhook(this.projectId)
            .then(() => {
                this.webhookEnabled = true;
            });
    }

}

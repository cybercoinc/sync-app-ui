import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'client/service/auth.service';
import { MsProjectClientService } from 'client/service/microservices/ms-project-client.service';
import { NotificationsService } from 'client/modules/notifications/notifications.service';
import { Router } from '@angular/router';

@Component({
    selector: 'procore-webhook',
    templateUrl: 'client/modules/projects/edit-project/components/project-settings/procore-webhook/procore-webhook.component.html',
    styleUrls: ['client/modules/projects/edit-project/components/project-settings/procore-webhook/procore-webhook.component.css']
})
export class ProcoreWebhookComponent implements OnInit {
    @Input() projectId;

    constructor(protected AuthService: AuthService,
                protected MsProjectClientService: MsProjectClientService,
                protected notificationsService: NotificationsService,
                private router: Router) {
    }

    ngOnInit() {
        console.log('im here');
    }

}

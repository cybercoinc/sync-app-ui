import {Component, OnInit} from "@angular/core";
import {AuthService} from "client/service/auth.service";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {User} from "client/entities/entities";
import {ActivatedRoute} from "@angular/router";
import {MsUserClientService} from "client/service/microservices/ms-user-client.service";
import {FormControl} from "@angular/forms";
import {NotificationsService} from "client/modules/notifications/notifications.service";

@Component({
    selector: 'project-settings',
    templateUrl: 'client/modules/projects/edit-project/components/project-settings/project-settings.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/project-settings/project-settings.component.css'
    ],
})
export class ProjectSettingsComponent implements OnInit {
    constructor(protected AuthService: AuthService,
                protected NotificationsService: NotificationsService,
                protected MsProjectClientService: MsProjectClientService,
                protected MsUserClientService: MsUserClientService,
                protected ActivatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.ActivatedRoute.parent.params.forEach((params) => {
            this.projectId = +params['project_id'];
        });

        // this.NotificationsService.addInfo('test');
        // this.NotificationsService.addWarning('test');
        // this.NotificationsService.addError('test');

        return this.MsProjectClientService.syncAssignees(this.projectId);
    }



    protected projectId: number;
    protected pbrUser: User;
    protected isEdit: boolean = false;
    protected users: any = [];
    private isBillingUser: boolean = false;
}

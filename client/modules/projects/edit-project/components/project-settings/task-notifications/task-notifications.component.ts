import {Component, OnInit, Input} from "@angular/core";
import {AuthService} from "client/service/auth.service";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {Project, NotificationPolicy} from "client/entities/entities";
import {NotificationsService} from "client/modules/notifications/notifications.service";

@Component({
    selector: 'task-notification',
    templateUrl: 'client/modules/projects/edit-project/components/project-settings/task-notifications/task-notifications.component.html',
    styleUrls: ['client/modules/projects/edit-project/components/project-settings/task-notifications/task-notifications.component.css'],
})
export class TaskNotificationsComponent implements OnInit {
    @Input() projectId;

    private project: Project = null;
    private policies: NotificationPolicy[];

    constructor(protected AuthService: AuthService,
                protected MsProjectClientService: MsProjectClientService,
                protected notificationsService: NotificationsService) {}

    ngOnInit(): void {
        this.MsProjectClientService.getProjectByid(this.projectId)
            .then(project => {
                this.project = project[0];

                return this.MsProjectClientService.getNotificationPolicy({
                    project_fk_id: this.project.id
                });
            })
            .then(policies => {
                this.policies = policies;
            });
    }

    getPolicyLink(policyId = '') {
        return '#/projects/' + this.project.id + '/edit-project/policy/' + policyId;
    }

    switchEnabling(policyId, event) {
        this.MsProjectClientService.updateNotificationPolicy(policyId, {is_enabled: event.checked});
    }

    removePolicy(policyId) {
        let dialogRef = this.notificationsService.addConfirm('Are you sure you want to remove this policy?');

        return new Promise((resolve, reject) => {
            dialogRef
                .afterClosed()
                .subscribe(res => {
                    if (res) {
                        this.MsProjectClientService.removeNotificationPolicy(policyId)
                            .then(() => {
                                this.policies.forEach((value, key) => {
                                    if (value.id == policyId) {
                                        this.policies.splice(key, 1);
                                        return false;
                                    }
                                });
                            });
                    }
                });
        });
    }
}

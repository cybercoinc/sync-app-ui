import {Component, OnInit, Input} from "@angular/core";
import {AuthService} from "client/service/auth.service";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {Project} from "client/entities/entities";

@Component({
    selector: 'task-notification',
    templateUrl: 'client/modules/projects/edit-project/components/project-settings/task-notifications/task-notifications.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/project-settings/task-notifications/task-notifications.component.css'
    ],
})
export class TaskNotificationsComponent implements OnInit {
    @Input() projectId;

    private project: Project = null;

    constructor(protected AuthService: AuthService,
                protected MsProjectClientService: MsProjectClientService) {}

    ngOnInit(): void {
        this.MsProjectClientService.getProjectByid(this.projectId)
            .then(project => {
                this.project = project[0];
            });
    }

    save() {
        this.MsProjectClientService.saveNotificationSettings(this.projectId, this.project.is_enable_notifications, this.project.notification_cc_emails);
    }
}

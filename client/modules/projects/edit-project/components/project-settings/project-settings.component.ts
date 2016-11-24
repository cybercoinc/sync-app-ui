import {Component, OnInit, Input} from "@angular/core";
import {AuthService} from "client/service/auth.service";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {User} from "client/entities/entities";

@Component({
    selector: 'project-settings',
    templateUrl: 'client/modules/projects/edit-project/components/project-settings/project-settings.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/project-settings/project-settings.component.css'
    ],
})
export class ProjectSettingsComponent implements OnInit {
    constructor(protected AuthService: AuthService, protected MsProjectClientService: MsProjectClientService) {
    }

    ngOnInit() {
        this.MsProjectClientService.getProjectUsers(5716544847872000, this.AuthService.authUser.auth_session_id)
            .then(usersList => {
                this.usersList = usersList;
            })
    }

    protected usersList: User[];
}

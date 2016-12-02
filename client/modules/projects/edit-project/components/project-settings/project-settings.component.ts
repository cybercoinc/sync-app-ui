import {Component, OnInit, Input} from "@angular/core";
import {AuthService} from "client/service/auth.service";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {User} from "client/entities/entities";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'project-settings',
    templateUrl: 'client/modules/projects/edit-project/components/project-settings/project-settings.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/project-settings/project-settings.component.css'
    ],
})
export class ProjectSettingsComponent implements OnInit {
    constructor(protected AuthService: AuthService,
                protected MsProjectClientService: MsProjectClientService,
                protected ActivatedRoute: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        let projectId = null;

        this.ActivatedRoute.parent.params.forEach((params) => {
            projectId = +params['project_id'];
        });

        Promise.all([
            this.MsProjectClientService.getPbrUser(projectId, this.AuthService.authTokenId),
            this.MsProjectClientService.getProjectUsers(projectId, this.AuthService.authTokenId)
        ])
            .then(resultsList => {
                this.pbrUser = resultsList[0];
                this.usersList = resultsList[1];
            })
    }

    protected usersList: User[];
    protected pbrUser: User;
}

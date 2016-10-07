import {Component, OnInit} from "@angular/core";
import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {AuthService} from 'client/service/auth.service';

@Component({
    selector: "index",
    templateUrl: `client/modules/user-application/projects/index/index.component.html`,
    styleUrls: ['client/modules/user-application/projects/index/index.component.css'],
})
export class IndexComponent implements OnInit {
    constructor(protected MsProjectClient: MsProjectClientService, protected AuthService: AuthService) {
    }

    projects: [{}] = null;

    ngOnInit(): void {
        this.getActiveProjects();
    }

    getActiveProjects(): void {
        this.MsProjectClient.getActiveProjects(this.AuthService.authUser.id, this.AuthService.authUser.auth_session_id)
            .then(projects => this.projects = projects);
    }

}

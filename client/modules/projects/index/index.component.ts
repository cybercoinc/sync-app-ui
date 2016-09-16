import {Component, OnInit} from "@angular/core";
import {MsProjectClientService} from '../../../service/microservices/ms-project-client.service';
import {AuthService} from '../../../service/auth.service';

@Component({
    selector: "index",
    templateUrl: `client/modules/projects/index/index.component.html`
})
export class IndexComponent implements OnInit {
    constructor(protected MsProjectClient: MsProjectClientService, protected AuthService: AuthService) {
    }

    projects: [{}];

    ngOnInit(): void {
        this.getActiveProjects();
    }

    getActiveProjects(): void {
        this.MsProjectClient.getActiveProjects(this.AuthService.authUser.id, this.AuthService.authUser.auth_session_id)
            .then(projects => this.projects = projects);
    }

}

import {Component, OnInit} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {AuthService} from 'client/service/auth.service';

@Component({
    selector: "choose-procore-project",
    templateUrl: `client/modules/projects/project-wizard/choose-procore-project/choose-procore-project.component.html`,
})
export class ChooseProcoreProjectComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService, protected AuthService: AuthService) {
    }

    ngOnInit() {
        this.MsProjectClientService.getProcoreProjects(this.AuthService.authUser.id, this.AuthService.authUser.auth_session_id)
            .then(procoreProjects => this.procoreProjects = procoreProjects);
    }

    procoreProjects: [{}];

    filterTimeout;

    filterProjects(name: string) {
        if (this.filterTimeout) {
            window.clearTimeout(this.filterTimeout);
        }

        console.log(this.procoreProjects);

        this.filterTimeout = setTimeout(function () {

            console.log(name);
        }, 500);
    }
}

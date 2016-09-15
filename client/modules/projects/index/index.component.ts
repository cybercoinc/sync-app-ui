import {Component, OnInit} from "@angular/core";
import {MsProjectClientService} from '../../../service/microservices/ms-project-client.service';
import {AuthService} from '../../../service/auth.service';

@Component({
    selector: "index",
    templateUrl: `client/modules/projects/index/index.component.html`
})
export class IndexComponent implements OnInit {
    constructor(MsProjectClient: MsProjectClientService, private authService: AuthService) {
        this.MsProjectClient = MsProjectClient
    }

    projects: [{}];

    ngOnInit(): void {
        console.log(this.authService.authUser);

        this.getActiveProjects();
    }

    getActiveProjects(): void {
        this.MsProjectClient.getActiveProjects().then(projects => this.projects = projects);
    }

    MsProjectClient: MsProjectClientService;
}

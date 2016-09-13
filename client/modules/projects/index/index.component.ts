import {Component, OnInit} from "@angular/core";
import {MsProjectClientService} from '../../../service/microservices/ms-project-client.service';

@Component({
    selector: "index",
    templateUrl: `client/modules/projects/index/index.component.html`
})
export class IndexComponent implements OnInit {
    constructor(MsProjectClient: MsProjectClientService) {
        this.MsProjectClient = MsProjectClient
    }

    projects: [{}];

    ngOnInit(): void {
        this.getActiveProjects();
    }

    getActiveProjects(): void {
        this.MsProjectClient.getActiveProjects().then(projects => this.projects = projects);
    }

    MsProjectClient: MsProjectClientService;
}

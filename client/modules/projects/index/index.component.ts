import {Component, OnInit} from "@angular/core";
import {MsProjectClientService} from '../../../service/microservices/ms-project-client.service';


@Component({
    selector: "index",
    templateUrl: `client/modules/projects/index/index.component.html`
})
export class IndexComponent implements OnInit {
    ngOnInit(): void {
        this.projects = this.MsProjectClient.getProjects();

        console.log(this.projects);
    }

    MsProjectClient: MsProjectClientService;
    projects: [{}];

    constructor(MsProjectClient: MsProjectClientService) {
        this.MsProjectClient = MsProjectClient
    }
}

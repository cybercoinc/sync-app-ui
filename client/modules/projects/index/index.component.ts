import {Component, OnInit} from "@angular/core";
import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {AuthService} from 'client/service/auth.service';

@Component({
    moduleId: module.id,
    selector: "index",
    templateUrl: `index.component.html`,
    styleUrls: ['index.component.css'],
})
export class IndexComponent implements OnInit {
    constructor(protected MsProjectClient: MsProjectClientService, protected AuthService: AuthService) {
    }

    projectRows: [{
        project: {id: number},
        is_expanded: boolean
    }];

    ngOnInit(): void {
        this.getActiveProjects();
    }

    getActiveProjects(): void {
        this.MsProjectClient.getActiveProjects(this.AuthService.authUser.id, this.AuthService.authUser.auth_session_id)
            .then(projects => {
                this.projectRows = [];

                projects.forEach(project => {
                    this.projectRows.push({
                        project: project,
                        is_expanded: false
                    })
                })
            });
    }

    projectRowExpand(projectRow): void {
        this.projectRows.forEach(projRow => {
            if (projectRow.project.id !== projRow.project.id) {
                projRow.is_expanded = false;
            }
        });

        projectRow.is_expanded = !projectRow.is_expanded;
    }
}

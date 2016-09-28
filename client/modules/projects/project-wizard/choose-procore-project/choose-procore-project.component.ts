import {Component, OnInit, Input, Output} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {AuthService} from 'client/service/auth.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: "choose-procore-project",
    templateUrl: `client/modules/projects/project-wizard/choose-procore-project/choose-procore-project.component.html`,
    styleUrls: ['client/modules/projects/project-wizard/choose-procore-project/choose-procore-project.component.css'],
})
export class ChooseProcoreProjectComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService, protected AuthService: AuthService, private router: Router, private route: ActivatedRoute) {
        this.selectedProject = null;
    }

    ngOnInit() {
        this.getProcoreProjects()
            .then(procoreProjects => this.procoreProjects = procoreProjects);
    }

    procoreProjects: [{}]|null = null;
    selectedProject: {
        active: boolean,
        name: string,
        address: string,
        city: string,
        country_code: string,
        created_at: string,
        company: {
            id: number,
            name: string
        },
        id: number
    }|null;

    filterTimeout;

    filterProjects(name: string) {
        if (this.filterTimeout) {
            window.clearTimeout(this.filterTimeout);
        }

        this.filterTimeout = setTimeout(e => {
            this.procoreProjects = null;
            this.selectedProject = null;

            this.getProcoreProjects()
                .then(procoreProjects => {
                    this.procoreProjects = procoreProjects.filter(project => {
                        return project['name'].toLowerCase().indexOf(name.toLowerCase()) !== -1;
                    });

                    return this.procoreProjects;
                })
        }, 500);
    }

    getProcoreProjects() {
        // todo show only 10-20 projects and ask for filtering them

        return this.MsProjectClientService.getProcoreProjects(this.AuthService.authUser.id, this.AuthService.authUser.auth_session_id);
    }

    chooseProject(project: {
        is_connected: boolean
    }) {
        if (project.is_connected) {
            return false;
        }

        this.selectedProject = project;
    }

    goToNextStep() {
        let data = {
            name: this.selectedProject.name,
            status: this.selectedProject.active ? 'active' : 'inactive',
            procore_company_id: this.selectedProject.company.id,
            procore_id: this.selectedProject.id,
            user_fk_id: this.AuthService.authUser.id
        };

        this.MsProjectClientService.create(data, this.AuthService.authUser.auth_session_id)
            .then(projectIds => {
                return this.router.navigate(['projects/wizard/choose-smartsheet-sheet', projectIds.shift()]);
            });
    }
}

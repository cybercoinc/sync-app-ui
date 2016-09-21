import {Component, OnInit, Input, Output} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {AuthService} from 'client/service/auth.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: "choose-procore-project",
    templateUrl: `client/modules/projects/project-wizard/choose-procore-project/choose-procore-project.component.html`,
    styles: [`
            .projects-list {
                height: 250px;
                width: 500px;
                overflow-x: auto;
                padding-top: 20px;
            }

            md-radio-button {
                margin-left: 20px;
            }
        `]
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

        const _self = this;

        _self.filterTimeout = setTimeout(function () {
            _self.procoreProjects = null;

            _self.getProcoreProjects()
                .then(function (procoreProjects) {
                    _self.procoreProjects = procoreProjects.filter(function (project) {
                        return project['name'].toLowerCase().indexOf(name.toLowerCase()) !== -1;
                    });

                    return _self.procoreProjects;
                });
        }, 500);
    }

    getProcoreProjects() {
        return this.MsProjectClientService.getProcoreProjects(this.AuthService.authUser.id, this.AuthService.authUser.auth_session_id);
    }

    chooseProject(project) {
        this.selectedProject = project;
    }

    goToNextStep() {
        let promise = this.MsProjectClientService.createProject({
            name: this.selectedProject.name,
            status: this.selectedProject.active ? 'active' : 'inactive',
            procore_company_id: this.selectedProject.company.id,
            procore_id: this.selectedProject.id,
            user_fk_id: this.AuthService.authUser.id
        }, this.AuthService.authUser.auth_session_id);

        promise.then(projectId => this.router.navigate(['projects/wizard/choose-smartsheet-sheet', projectId]));
    }
}

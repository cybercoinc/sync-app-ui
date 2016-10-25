import {Component, OnInit} from "@angular/core";
import {Router} from '@angular/router';

import {ProcoreProject} from 'client/entities/entities';

import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {MsBillingClientService} from 'client/service/microservices/ms-billing-client.service';
import {AuthService} from 'client/service/auth.service';

@Component({
    selector: "create-project",
    templateUrl: 'client/modules/projects/create-project/create-project.component.html',
    styleUrls: ['client/modules/projects/create-project/create-project.component.css'],
})
export class CreateProjectComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService,
                protected AuthService: AuthService,
                protected MsBillingClientService: MsBillingClientService,
                private router: Router) {
    }

    ngOnInit() {
        this.MsProjectClientService.getConnectedProcoreProjectsIds(this.AuthService.authUser.id,
            this.AuthService.authUser.auth_session_id)
            .then(connectedProcoreProjectsIdsList => {
                this.connectedProcoreProjectsIdsList = connectedProcoreProjectsIdsList;

                return this.getProcoreProjects();
            })
            .then(procoreProjects => {
                this.procoreProjects = procoreProjects
            });
    }

    protected procoreProjects: ProcoreProject[]|null = null;
    protected connectedProcoreProjectsIdsList: [number] = null;
    protected selectedProject: ProcoreProject|null = null;

    protected filterTimeout;

    filterProjects(name: string): void {
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
        return this.MsProjectClientService
            .getProcoreProjects(this.AuthService.authUser.id, this.AuthService.authUser.auth_session_id);
    }

    chooseProject(project: ProcoreProject) {
        if (this.checkIfAlreadyConnected(project)) {
            return false;
        }

        this.selectedProject = project;
    }

    checkIfAlreadyConnected(procoreProject: ProcoreProject): boolean {
        return this.connectedProcoreProjectsIdsList.indexOf(procoreProject.id) !== -1;
    }

    createNewProject() {
        let data = {
            name: this.selectedProject.name,
            status: this.selectedProject.active ? 'active' : 'inactive',
            procore_company_id: this.selectedProject.company.id,
            procore_project_id: this.selectedProject.id,
            user_fk_id: this.AuthService.authUser.id
        };

        let _projectId;

        this.MsProjectClientService.create(data, this.AuthService.authUser.auth_session_id)
            .then(projectIds => {
                _projectId = projectIds.shift();

                return this.MsBillingClientService.createStartLicense(_projectId, data.name,
                    this.AuthService.authUser.id, this.AuthService.authUser.auth_session_id);
            })
            .then(() => {
                return this.router.navigate(['projects/wizard/choose-smartsheet-sheet', _projectId]);
            })
    }
}
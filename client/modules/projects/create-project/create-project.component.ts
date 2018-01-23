import {Component, OnInit} from "@angular/core";
import {Router} from '@angular/router';

import {ProcoreProject} from 'client/entities/entities';

import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {MsLicenseClientService} from "../../../service/microservices/ms-license-client.service";

import {AuthService} from 'client/service/auth.service';

@Component({
    selector: "create-project",
    templateUrl: 'client/modules/projects/create-project/create-project.component.html',
    styleUrls: ['client/modules/projects/create-project/create-project.component.css'],
})
export class CreateProjectComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService,
                protected AuthService: AuthService,
                protected MsLicenseClientService: MsLicenseClientService,
                private router: Router) {
    }

    public canConnectNewProjects = true;

    ngOnInit() {

        this.MsLicenseClientService.isCompanyCanCreateProjects(this.AuthService.company.id)
            .then(response => {
                this.canConnectNewProjects = response;
            });

        this.MsProjectClientService.getConnectedProcoreProjectsIds()
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
            .getProcoreProjects(this.AuthService.authUser.id, this.AuthService.company.procore_id);
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
            procore_company_id: this.selectedProject.company.id,
            procore_project_id: this.selectedProject.id,
            company_fk_id: this.AuthService.company.id
        };

        let _projectId;

        this.MsProjectClientService.create(data)
            .then(projectId => {
                _projectId = projectId;

                if (!_projectId) {
                    throw new Error('no project id found');
                }

                return Promise.all([
                    this.MsLicenseClientService.createStartLicense(_projectId, data.name,
                        this.AuthService.authUser.id),
                    this.MsProjectClientService.syncProjectUsers(_projectId)
                ]);
            })
            .then((result) => {

                if (!result[0]) { // license has status 'suspended'
                    return this.router.navigate(['projects']);
                }

                return this.MsProjectClientService.createProcoreProjectWebhook(_projectId)
                    .then(() => {
                        return this.router.navigate(['projects', _projectId, 'edit-project', 'settings']);
                    });
            })
    }
}
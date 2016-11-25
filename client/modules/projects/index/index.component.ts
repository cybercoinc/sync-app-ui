import {Component, OnInit} from "@angular/core";
import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {AuthService} from 'client/service/auth.service';
import {Project, ProjectPipe} from 'client/entities/entities';

@Component({
    selector: 'index',
    templateUrl: `client/modules/projects/index/index.component.html`
})
export class IndexComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService,
                protected AuthService: AuthService) {
    }

    projectRows: [{
        project: Project,
        projectPipesList: ProjectPipe[]
    }] | any;

    ngOnInit(): void {
        this.getActiveProjectsWithPipes();
    }

    getActiveProjectsWithPipes(): void {
        let _projects;

        this.MsProjectClientService.getActiveProjects(this.AuthService.authUser.id, this.AuthService.authUser.auth_session_id)
            .then(projects => {
                _projects = projects;

                if (_projects.length === 0) {
                    return [];
                }

                let promises = [];

                projects.forEach(project => {
                    promises.push(
                        this.MsProjectClientService.getPipesByProjectId(project.id, this.AuthService.authUser.auth_session_id)
                    )
                });

                return Promise.all(promises);
            })
            .then(stepResults => {
                let pipesList = [];
                this.projectRows = [];

                stepResults.forEach(function (pipes) {
                    pipesList = pipesList.concat(pipes);
                });

                _projects.forEach(project => {
                    let projectPipesList = pipesList.filter((pipeObj: ProjectPipe) => {
                        return pipeObj.project_fk_id.id === project.id;
                    });

                    this.projectRows.push({
                        project: project,
                        projectPipesList: projectPipesList
                    })
                });

                return this.projectRows;
            })
    }

    getPipeStatus(projectPipesList, pipeType): string {
        let status = 'inactive';

        projectPipesList.forEach((pipe: ProjectPipe) => {
            if (pipe.type === pipeType) {
                status = pipe.status
            }
        });

        return status;
    }
}

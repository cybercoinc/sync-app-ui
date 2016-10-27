import {Component, OnInit} from "@angular/core";
import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {PipeConnectionService} from 'client/service/pipe-connection.service';
import {AuthService} from 'client/service/auth.service';
import {Project, ProjectPipe} from 'client/entities/entities';

@Component({
    selector: 'index',
    templateUrl: `client/modules/projects/index/index.component.html`,
    styleUrls: ['client/modules/projects/index/index.component.css'],
})
export class IndexComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService,
                protected AuthService: AuthService) {
    }

    projectRows: [{
        project: Project,
        is_expanded: boolean,
        projectPipesList: ProjectPipe[]
    }];

    ngOnInit(): void {
        this.getActiveProjectsWithPipes();
    }

    getActiveProjectsWithPipes(): void {
        let _projects;

        this.MsProjectClientService.getActiveProjects(this.AuthService.authUser.id, this.AuthService.authUser.auth_session_id)
            .then(projects => {
                _projects = projects;

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
                        is_expanded: false,
                        projectPipesList: projectPipesList
                    })
                });

                return this.projectRows;
            })
    }

    projectRowExpand(projectRow): void {
        this.projectRows.forEach(projRow => {
            if (projectRow.project.id !== projRow.project.id) {
                projRow.is_expanded = false;
            }
        });

        projectRow.is_expanded = !projectRow.is_expanded;
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

import {Component, OnInit} from "@angular/core";
import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {AuthService} from 'client/service/auth.service';
import {
    PIPE_TYPE_PRIVATE_TODOS, PIPE_TYPE_PUBLIC_TODOS, PIPE_TYPE_TASKS, Project,
    ProjectPipe
} from 'client/entities/entities';

@Component({
    selector: 'index',
    templateUrl: `client/modules/projects/index/index.component.html`,
    styleUrls: [
        'client/modules/projects/index/index.component.css'
    ]
})
export class IndexComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService,
                protected AuthService: AuthService) {
    }

    projectRows: [{
        project: Project,
        projectPipesList: ProjectPipe[],
        is_expanded: boolean
    }] | any;

    ngOnInit(): void {
        this.getActiveProjectsWithPipes();
    }

    getActiveProjectsWithPipes(projectNamePart = ''): void {
        let _projects;

        this.MsProjectClientService.getActiveProjects(this.AuthService.authUser.id, this.AuthService.company.id)
            .then(projects => {

                _projects = projects.filter(project => {
                    return project['name'].toLowerCase().indexOf(projectNamePart.toLowerCase()) !== -1;
                });

                if (_projects.length === 0) {
                    return [];
                }

                let promises = [];

                projects.forEach(project => {
                    promises.push(
                        this.MsProjectClientService.getPipesWhere({
                            project_fk_id: project.id
                        })
                    );
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
                        projectPipesList: projectPipesList,
                        is_expanded: false
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

    getPipeSyncSourceLink(projectPipesList, pipeType): string {
        let link = '';

        projectPipesList.forEach((pipe: ProjectPipe) => {
            if (pipeType !== pipe.type) {
                return;
            }

            if ([PIPE_TYPE_PRIVATE_TODOS, PIPE_TYPE_PUBLIC_TODOS].indexOf(pipe.type) !== -1) {
                link = pipe.sm_permalink;
            } else if (pipe.type === PIPE_TYPE_TASKS) {
                if (pipe.use_schedule_chart) {
                    link = '#/projects/' + pipe.project_fk_id.id + '/chart';
                } else {
                    link = pipe.sm_permalink;
                }
            }
        });

        return link;
    }

    getPipeSyncSource(projectPipesList, pipeType): string {
        let source = 'smartsheet';

        projectPipesList.forEach((pipe: ProjectPipe) => {
            if (pipeType !== pipe.type) {
                return;
            }

            if (pipe.type === PIPE_TYPE_TASKS && pipe.use_schedule_chart) {
                source = 'gantt-chart';
            }
        });

        return source;
    }

    projectRowExpand(projectRow): void {
        this.projectRows.forEach(projRow => {
            if (projectRow.project.id !== projRow.project.id) {
                projRow.is_expanded = false;
            }
        });

        projectRow.is_expanded = !projectRow.is_expanded;
    }

    isPipeExist(projectRow, pipeType): boolean {
        let exists = false;

        projectRow.projectPipesList.forEach(pipe => {
            if (pipe.type === pipeType) {
                exists = true;
            }
        });

        return exists;
    }

    projectHasPipes(projectRow) {
        return projectRow.projectPipesList.length > 0;
    }

    protected filterTimeout;

    filterProjects(name: string): void {
        if (this.filterTimeout) {
            window.clearTimeout(this.filterTimeout);
        }

        this.filterTimeout = setTimeout(e => {
            this.projectRows = null;

            this.getActiveProjectsWithPipes(name);
        }, 500);
    }
}

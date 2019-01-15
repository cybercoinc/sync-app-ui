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

    filteredProjectRows: [{
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

                // to filter from backend
                _projects = projects.filter(project => {
                    return project['name'].toLowerCase().indexOf(projectNamePart.toLowerCase()) !== -1;
                });

                if (_projects.length === 0) {
                    return [];
                }

                let projectsIds = [];

                _projects.forEach(project => {
                    projectsIds.push(project.id);
                });

                return this.MsProjectClientService.getPipesByProjectsIds(projectsIds);
            })
            .then(pipesList => {
                this.projectRows = [];
                this.filteredProjectRows = [];

                _projects.forEach(project => {
                    let projectPipesList = pipesList.filter((pipeObj: ProjectPipe) => {
                        return pipeObj.project_fk_id.id === project.id;
                    });

                    this.projectRows.push({
                        project: project,
                        projectPipesList: projectPipesList,
                        is_expanded: false
                    });

                    this.filteredProjectRows.push({
                        project: project,
                        projectPipesList: projectPipesList,
                        is_expanded: false
                    });
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

    /**
     * Get microsoft online project link
     * @param projectPipesList
     * @param pipeType
     */
    getMicrosoftOnlineProjectLink(projectPipesList, pipeType): string {
        let pipeObj;
        projectPipesList.forEach((pipe: ProjectPipe) => {
            if (pipe.type === pipeType) {
                pipeObj = pipe;
            }
        });

        if (pipeObj) {
            return `${this.AuthService.authUser.microsoft_oauth.project_url}/project%20detail%20pages/schedule.aspx?projuid=${pipeObj.ms_project_id}`
        }
        return '';
    }

    getDocumentPipesStatus(projectPipesList): string {
        let status = 'inactive';

        projectPipesList.forEach((pipe: ProjectPipe) => {
            if (pipe.type === 'document_pipe' && pipe.status === 'active') {
                status = pipe.status;
            }
        });

        return status;
    }

    getPipeStatusById(projectPipesList, pipeId: number): string {
        let status = 'inactive';

        projectPipesList.forEach((pipe: ProjectPipe) => {
            if (pipe.id === pipeId) {
                status = pipe.status;
            }
        });

        return status;
    }

    getPipeSyncSourceLink(projectPipesList, pipeType): string {
        let link = '';

        projectPipesList.forEach((pipe: ProjectPipe) => {
            if (pipeType === pipe.type) {
                if (pipe.use_schedule_chart) {
                    link = '#/projects/' + pipe.project_fk_id.id + '/pipes/' + pipe.id + '/chart';
                } else if (pipe.sm_permalink) {
                    link = pipe.sm_permalink;
                }
            }
        });

        return link;
    }

    getPipeSyncSource(projectPipesList, pipeType): string {
        let source = 'smartsheet';

        projectPipesList.forEach((pipe: ProjectPipe) => {
            if (pipeType === pipe.type) {
                if (pipe.connected_to === 'microsoft-online') {
                    source = 'microsoft-online';
                } else if (pipe.connected_to === 'microsoft-desktop') {
                    source = 'microsoft-desktop';
                } else if (pipe.use_schedule_chart) {
                    source = 'gantt-chart';
                }
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

    getPipesByType(projectRow, type: string): ProjectPipe {
        return projectRow.projectPipesList.filter(pipe => pipe.type === type).sort((a, b) => {
            return a.created_at === b.created_at ? 0 : (a.created_at > b.created_at ? 1 : -1);
        });
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
            this.filteredProjectRows = null;
            // to filter from backend
            this.filteredProjectRows = this.projectRows.filter(projectRow => {
                return projectRow.project['name'].toLowerCase().indexOf(name.toLowerCase()) !== -1;
            });
        }, 500);
    }
}

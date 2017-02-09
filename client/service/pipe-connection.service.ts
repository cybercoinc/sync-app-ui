import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {MsProjectClientService} from './microservices/ms-project-client.service';
import {AuthService} from './auth.service';
import {MsSyncClientService} from 'client/service/microservices/ms-sync-client.service';

import {Project, ProjectPipe} from 'client/entities/entities';
import {PIPE_STATUS_ACTIVE, PIPE_STATUS_DISABLED} from 'client/entities/entities';
import {AuthBootstrapService} from "./resolvers/auth-bootstrap.service";

@Injectable()
export class PipeConnectionService implements Resolve<{}> {

    constructor(protected MsProjectClientService: MsProjectClientService,
                protected MsSyncClientService: MsSyncClientService,
                protected AuthBootstrapService: AuthBootstrapService,
                protected AuthService: AuthService) {
    }


    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Promise<any> {

        let projectId = +route.params['project_id'];

        //todo can't specify resolvers order. child loads first but need bootstrap service to start with
        return this.AuthBootstrapService.load()
            .then(() => {
                return Promise.all([
                    this.getProject(projectId),
                    this.getPipesList(projectId)
                ]);
            });
    }

    public project: Project;
    public pipesListObj: {
        public_todos: ProjectPipe,
        private_todos: ProjectPipe,
        tasks: ProjectPipe,
    }|{} = {};

    getProject(projectId: number): Promise<Project> {
        return this.MsProjectClientService.getProjectByid(projectId)
            .then(projectsList => {

                this.project = projectsList.shift();

                return this.project;
            });
    }

    getPipesList(projectId: number): Promise<ProjectPipe[]> {
        return this.MsProjectClientService.getPipesWhere({
            project_fk_id: projectId
        })
            .then(pipesList => {
                this.pipesListObj = [];

                pipesList.forEach((pipe: ProjectPipe) => {
                    this.pipesListObj[pipe.type] = pipe;
                });

                return this.pipesListObj;
            })
    }

    refreshPipesList() {
        return this.MsProjectClientService.getPipesWhere({
            project_fk_id: this.project.id
        })
            .then(pipesList => {
                pipesList.forEach((pipe: ProjectPipe) => {
                    this.pipesListObj[pipe.type] = pipe;
                });

                return this.pipesListObj;
            });
    }

    enablePipe(pipeId: number) {
        let _pipeObj: ProjectPipe;

        return this.MsProjectClientService.getPipeById(pipeId)
            .then(pipeObj => {
                _pipeObj = pipeObj;

                return this.MsProjectClientService.enablePipe(pipeId);
            })
            .then(() => {
                return this.refreshPipesList();
            })
            .then(() => {
                if (!_pipeObj.sm_webhook_id) {
                    return this.MsProjectClientService.createSmPipeWebhook(pipeId);
                }

                return _pipeObj.sm_webhook_id;
            })
            .then(() => {
                return this.MsProjectClientService.changeSmPipeWebhookStatus(pipeId, true);
            });
    }

    disablePipe(pipeId) {
        return this.MsProjectClientService.updatePipe(pipeId, {
            status: PIPE_STATUS_DISABLED
        })
            .then(() => {
                return this.refreshPipesList();
            })
            .then(() => {
                return this.MsProjectClientService.changeSmPipeWebhookStatus(pipeId, false);
            })
    }

    deletePipe(pipeId) {
        return this.MsProjectClientService.deletePipe(pipeId)
            .then(() => {
                return this.refreshPipesList();
            });
    }

    createNewOrGetExistingPipe(pipeType) {
        let project = this.project;

        return this.MsProjectClientService.getPipesWhere({
            project_fk_id: this.project.id,
            type: pipeType
        })
            .then(pipesList => {
                let existingPipeObj = pipesList.shift();

                if (existingPipeObj) {
                    return existingPipeObj.id;
                } else {
                    return this.MsProjectClientService.createPipe(project.id, {
                        type: pipeType,
                        status: PIPE_STATUS_DISABLED,
                        procore_company_id: project.procore_company_id,
                        procore_project_id: project.procore_project_id,
                        user_fk_id: this.AuthService.authUser.id
                    }, this.getPipeLabelByType(pipeType));
                }
            });
    }

    createNewOrGetExistingWorkspaceId(workspaceName): Promise<number> {
        let project = this.project;
        let _workspaceId;

        return new Promise((resolve, reject) => {
            if (!project.smartsheet_workspace_id) {
                // create new workspace at smartsheet
                return this.MsProjectClientService
                    .createSmartsheetWorkspace(project.id, workspaceName)
                    .then(workspace => {
                        _workspaceId = workspace.id;

                        return this.MsProjectClientService.update(project.id, {
                            smartsheet_workspace_id: _workspaceId
                        });
                    })
                    .then(() => {
                        this.project.smartsheet_workspace_id = _workspaceId;

                        resolve(_workspaceId);
                    })
                    .catch(err => reject(err));
            } else {
                resolve(project.smartsheet_workspace_id);
            }
        });
    }

    getPipeLabelByType(pipeType: string): string {
        let label = '';

        switch (pipeType) {
            case 'public_todos':
                label = 'Public Todos';
                break;
            case 'private_todos': {
                label = 'Private Todos';
                break;
            }
            case 'tasks': {
                label = 'Tasks';
                break;
            }
        }

        return label;
    }
}

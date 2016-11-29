import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {MsProjectClientService} from './microservices/ms-project-client.service';
import {AuthService} from './auth.service';
import {MsSyncClientService} from 'client/service/microservices/ms-sync-client.service';

import {Project, ProjectPipe} from 'client/entities/entities';
import {PIPE_STATUS_ACTIVE, PIPE_STATUS_DISABLED} from 'client/entities/entities';

@Injectable()
export class PipeConnectionService implements Resolve<{}> {

    constructor(protected MsProjectClientService: MsProjectClientService,
                protected MsSyncClientService: MsSyncClientService,
                protected AuthService: AuthService) {
    }

    /**
     * @param route
     * @param state
     * @return {Promise<{}>}
     */
    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Promise<any> {

        let projectId = +route.params['project_id'];

        // todo may double /me request. check it later
        return this.AuthService.getAuthUser()
            .then(authUser => {
                return Promise.all([
                    this.getProject(projectId, authUser.auth_session_id),
                    this.getPipesList(projectId, authUser.auth_session_id)
                ]);

            });
    }

    public project: Project;
    public pipesListObj: {
        public_todos: ProjectPipe,
        private_todos: ProjectPipe,
        tasks: ProjectPipe,
    }|{} = {};

    getProject(projectId: number, authSessionId: string): Promise<Project> {
        return this.MsProjectClientService.getProjectByid(projectId, authSessionId)
            .then(projectsList => {

                this.project = projectsList.shift();

                return this.project;
            });
    }

    getPipesList(projectId: number, authSessionId: string): Promise<ProjectPipe[]> {
        return this.MsProjectClientService.getPipesByProjectId(projectId, authSessionId)
            .then(pipesList => {
                this.pipesListObj = [];

                pipesList.forEach((pipe: ProjectPipe) => {
                    this.pipesListObj[pipe.type] = pipe;
                });

                return this.pipesListObj;
            })
    }

    refreshPipesList() {
        return this.MsProjectClientService.getPipesByProjectId(this.project.id, this.AuthService.authUser.auth_session_id)
            .then(pipesList => {
                pipesList.forEach((pipe: ProjectPipe) => {
                    this.pipesListObj[pipe.type] = pipe;
                });

                return this.pipesListObj;
            });
    }

    enablePipe(pipeId: number) {
        let _pipeObj: ProjectPipe;

        return this.MsProjectClientService.getPipeById(pipeId, this.AuthService.authUser.auth_session_id)
            .then(pipeObj => {
                _pipeObj = pipeObj;

                return this.MsProjectClientService.updatePipe(pipeId, {
                    status: PIPE_STATUS_ACTIVE
                }, this.AuthService.authUser.auth_session_id);
            })
            .then(() => {
                this.refreshPipesList();

                return this.MsSyncClientService.startPipeSync(pipeId, this.AuthService.authUser.auth_session_id);
            })
            .then(() => {
                if (!_pipeObj.sm_webhook_id) {
                    return this.MsProjectClientService.createSmPipeWebhook(pipeId, this.AuthService.authUser.auth_session_id);
                }

                return _pipeObj.sm_webhook_id;
            })
            .then(() => {
                return this.MsProjectClientService.changeSmPipeWebhookStatus(pipeId, true, this.AuthService.authUser.auth_session_id);
            });
    }

    disablePipe(pipeId) {
        return this.MsProjectClientService.updatePipe(pipeId, {
            status: PIPE_STATUS_DISABLED
        }, this.AuthService.authUser.auth_session_id)
            .then(() => {
                return this.refreshPipesList();
            })
            .then(() => {
                return this.MsProjectClientService.changeSmPipeWebhookStatus(pipeId, false, this.AuthService.authUser.auth_session_id);
            })
    }

    deletePipe(pipeId) {
        return this.MsProjectClientService.deletePipe(pipeId, this.AuthService.authUser.auth_session_id)
            .then(() => {
                return this.refreshPipesList();
            });
    }

    createNewOrGetExistingPipe(pipeType) {
        let project = this.project;

        return this.MsProjectClientService.getPipesWhere({
            project_fk_id: this.project.id,
            type: pipeType
        }, this.AuthService.authUser.auth_session_id)
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
                    }, this.getPipeLabelByType(pipeType), this.AuthService.authUser.auth_session_id);
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
                    .createSmartsheetWorkspace(project.id, workspaceName, this.AuthService.authUser.auth_session_id)
                    .then(workspace => {
                        _workspaceId = workspace.id;

                        return this.MsProjectClientService.update(project.id, {
                            smartsheet_workspace_id: _workspaceId
                        }, this.AuthService.authUser.auth_session_id);
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

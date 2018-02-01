import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { MsProjectClientService } from './microservices/ms-project-client.service';
import { AuthService } from './auth.service';
import { MsSyncClientService } from 'client/service/microservices/ms-sync-client.service';

import { Project, ProjectPipe } from 'client/entities/entities';
import { PIPE_STATUS_ACTIVE, PIPE_STATUS_DISABLED } from 'client/entities/entities';
import { AuthBootstrapService } from './resolvers/auth-bootstrap.service';

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
    } | {} = {};

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
        let _pipeObj;

        return this.MsProjectClientService.getPipeById(pipeId)
            .then(pipesList => {
                _pipeObj = pipesList.shift();

                if (!_pipeObj) {
                    throw new Error(`Pipe #${pipeId} was not found`);
                }

                return this.MsProjectClientService.enablePipe(pipeId);
            })
            .then(() => {
                return this.refreshPipesList();
            })
            .then(() => {
                let promises = [];

                if (!_pipeObj.use_schedule_chart && !_pipeObj.sm_webhook_id) {
                    promises.push(
                        this.MsProjectClientService.createSmPipeWebhook(pipeId)
                    );
                }

                const triggerResourceName: 'ToDos' | 'Tasks' = ['public_todos', 'private_todos'].indexOf(_pipeObj.type) !== -1 ? 'ToDos' : 'Tasks';

                // todo currently not enabling triggers for tasks because we have no sync logic implemented (pr to sm)
                if (triggerResourceName !== 'Tasks') {
                    promises.push(
                        this.MsProjectClientService.addProcoreWebhookTriggers(
                            _pipeObj.project_fk_id.id,
                            triggerResourceName
                        )
                    );
                }

                return Promise.all(promises);
            })
            .then(() => {
                if (_pipeObj.use_schedule_chart) {
                    return;
                }

                return this.MsProjectClientService.changeSmPipeWebhookStatus(pipeId, true);
            });
    }

    disablePipe(pipeId) {
        let _pipeObj;

        return this.MsProjectClientService.getPipeById(pipeId)
            .then(pipesList => {
                _pipeObj = pipesList.shift();

                return this.MsProjectClientService.disablePipe(pipeId);
            })
            .then(() => {
                return this.refreshPipesList();
            })
            .then(() => {
                const triggerResourceName: 'ToDos' | 'Tasks' = ['public_todos', 'private_todos'].indexOf(_pipeObj.type) !== -1 ? 'ToDos' : 'Tasks';

                let needToRemoveTriggers = true;

                if (triggerResourceName === 'ToDos') {
                    for (let type in this.pipesListObj) {
                        if (this.pipesListObj.hasOwnProperty(type)) {
                            let pipe = this.pipesListObj[type];

                            if (pipe.id !== pipeId && type !== 'tasks' && pipe.status === 'active') {
                                needToRemoveTriggers = false;
                            }
                        }
                    }
                }

                if (needToRemoveTriggers) {
                    return this.MsProjectClientService.removeProcoreWebhookTriggers(_pipeObj.project_fk_id.id, triggerResourceName);
                }
            })
            .then(() => {
                if (_pipeObj.use_schedule_chart) {
                    return;
                }

                return this.MsProjectClientService.changeSmPipeWebhookStatus(pipeId, false);
            })
    }

    deletePipe(pipeId) {
        return this.MsProjectClientService.deletePipe(pipeId)
            .then(() => {
                return this.refreshPipesList();
            });
    }

    createNewOrGetExistingPipe(pipeType, useScheduleChart = false) {
        return this.MsProjectClientService.getPipesWhere({
            project_fk_id: this.project.id,
            type: pipeType
        })
            .then(pipesList => {
                let existingPipeObj = pipesList.shift();

                if (existingPipeObj) {
                    return existingPipeObj.id;
                } else {
                    return this.MsProjectClientService.createPipe({
                        project_id: this.project.id,
                        type: pipeType,
                        name: this.getPipeLabelByType(pipeType),
                        use_schedule_chart: useScheduleChart
                    });
                }
            });
    }

    createNewOrGetExistingWorkspaceId(workspaceName): Promise<number> {
        let project = this.project;

        return new Promise((resolve, reject) => {
            if (!project.smartsheet_workspace_id) {
                // create new workspace at smartsheet
                return this.MsProjectClientService.createSmartsheetWorkspace(project.id, workspaceName)
                    .then(workspaceId => {
                        this.project.smartsheet_workspace_id = workspaceId;

                        resolve(workspaceId);
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
                label = 'Project Items';
                break;
            case 'private_todos':
                label = 'Private Items';
                break;
            case 'tasks':
                label = 'Project Schedule';
                break;
            case 'document_pipe':
                label = 'Document Pipe';
                break;
        }

        return label;
    }
}

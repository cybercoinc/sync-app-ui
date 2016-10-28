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
        return new Promise<{}>((resolve, reject) => {
            if (!this.project) {
                return this.MsProjectClientService.getProjectByid(projectId, authSessionId)
                    .then(projectsList => {
                        let project = projectsList.shift();

                        if (!project) {
                            return reject(new Error('no project found'));
                        }

                        this.project = project;

                        return resolve(this.project);
                    })
            }

            return resolve(this.project);
        });
    }

    getPipesList(projectId: number, authSessionId: string): Promise<ProjectPipe[]> {
        return new Promise<{}>((resolve, reject) => {
            if (!Object.keys(this.pipesListObj).length) {
                return this.MsProjectClientService.getPipesByProjectId(projectId, authSessionId)
                    .then(pipesList => {
                        pipesList.forEach((pipe: ProjectPipe) => {
                            this.pipesListObj[pipe.type] = pipe;
                        });

                        return resolve(this.pipesListObj);
                    })
            }

            return resolve(this.pipesListObj);
        });
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

        this.MsProjectClientService.updatePipe(pipeId, {
            status: PIPE_STATUS_ACTIVE
        }, this.AuthService.authUser.auth_session_id)
            .then(() => {
                this.MsSyncClientService.startPipeSync(pipeId, this.AuthService.authUser.auth_session_id);

                return this.refreshPipesList();
            });
    }

    disablePipe(pipeId) {
        this.MsProjectClientService.updatePipe(pipeId, {
            status: PIPE_STATUS_DISABLED
        }, this.AuthService.authUser.auth_session_id)
            .then(() => {
                return this.refreshPipesList();
            });
    }
}

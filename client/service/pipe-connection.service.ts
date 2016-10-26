import {Injectable} from "@angular/core";
import {MsProjectClientService} from './microservices/ms-project-client.service';
import {AuthService} from './auth.service';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Project, ProjectPipe} from 'client/entities/entities';

@Injectable()
export class PipeConnectionService implements Resolve<{}> {

    constructor(protected MsProjectClientService: MsProjectClientService,
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
}

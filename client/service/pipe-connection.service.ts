import {Injectable} from "@angular/core";
import {MsProjectClientService} from './microservices/ms-project-client.service';
import {AuthService} from './auth.service';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Project} from 'client/entities/entities';

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
                return this.getProject(projectId, authUser.auth_session_id);
            });
    }

    project: Project;

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
}

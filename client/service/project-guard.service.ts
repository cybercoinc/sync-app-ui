import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {MsProjectClientService} from "./microservices/ms-project-client.service";

@Injectable()
export class ProjectGuardService implements CanActivate {
    constructor(private msProjectClient: MsProjectClientService) {}

    canActivate(route: ActivatedRouteSnapshot) {
        return this.msProjectClient.getProjectByid(route.params['project_id'])
            .then(result => {
                let project = result.shift();

                return project.status == 'active';
            });
    }
}

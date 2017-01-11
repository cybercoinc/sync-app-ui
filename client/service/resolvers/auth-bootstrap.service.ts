import {Injectable, Inject}     from '@angular/core';
import {Http} from '@angular/http';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {ConfigService} from "../config.service";
import {AuthService} from "../auth.service";
import {RbacService} from "../rbac.service";

@Injectable()
export class AuthBootstrapService implements Resolve<{}> {
    constructor(protected Http: Http, @Inject(AuthService) protected AuthService: AuthService,
                @Inject(ConfigService) protected ConfigService: ConfigService, @Inject(RbacService) protected RbacService: RbacService) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Promise<any> {

        return this.load();
    }

    load() {
        return this.ConfigService.load()
            .then(() => {
                return this.AuthService.getAuthUser();
            }).then(() => {
                return this.RbacService.allowRole('user');
            })
    }
}

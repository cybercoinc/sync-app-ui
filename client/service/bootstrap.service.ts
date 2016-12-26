import {Injectable, Inject}     from '@angular/core';
import {Headers, Http, URLSearchParams, RequestOptions} from '@angular/http';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {ConfigService} from "./config.service";
import {AuthService} from "./auth.service";

@Injectable()
export class BootstrapService implements Resolve<{}> {
    constructor(protected Http: Http, @Inject(AuthService) protected AuthService: AuthService,
                @Inject(ConfigService) protected ConfigService: ConfigService) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Promise<any> {

        console.log('start bootstrap resolve');

        return this.load();
    }

    load() {
        return this.ConfigService.load()
            .then(() => {
                console.log('config loaded');

                return this.AuthService.getAuthUser();
            });
    }
}

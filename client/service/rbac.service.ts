import {Injectable, Inject} from "@angular/core";
import {Router} from '@angular/router';
import {Headers, Http, RequestOptions} from '@angular/http';
import {ConfigService} from "./config.service";
import {AuthService} from "./auth.service";


@Injectable()
export class RbacService {

    constructor(protected router: Router, protected Http: Http, @Inject(ConfigService) protected ConfigService: ConfigService,
                @Inject(AuthService) protected AuthService: AuthService) {
    }

    allowRole(role: string) {
        if (this.AuthService.authUser.role === role) {
            return true;
        }

        let navigateTo = ['/auth', 'procore'];

        if (role === 'guest') {
            navigateTo = ['/'];
        }

        this.router.navigate(navigateTo);

        return false;
    }
}

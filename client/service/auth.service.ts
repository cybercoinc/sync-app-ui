import {Injectable} from "@angular/core";
import {MsUserClientService} from './microservices/ms-user-client.service';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {User} from 'client/entities/entities';

@Injectable()
export class AuthService implements Resolve<{}> {

    constructor(private msUser: MsUserClientService) {
    }

    /**
     * @param route
     * @param state
     * @return {Promise<{}>}
     */
    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Promise<any> {

        return this.getAuthUser();
    }

    authUser: User = null;

    getAuthUser(): Promise<User> {
        return this.msUser.getMe()
            .then(authUser => {
                if (!authUser) {
                    throw new Error('no user found');
                }

                this.authUser = authUser;

                return this.authUser
            })
    }

    defaultAuth() {
        return this.msUser.defaultAuth()
            .then(response => window.location.replace('/'));
    }

    getProcoreAuthLink() {
        return this.msUser.url + 'auth/procore';
    }

    getSmartsheetAuthLink() {
        return this.msUser.url + 'auth/smartsheet';
    }

    logout(): void {
        this.authUser = null;
    }
}

import {Injectable} from "@angular/core";
import {MsUserClientService} from './microservices/ms-user-client.service';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {User} from 'client/entities/entities';

@Injectable()
export class AuthService implements Resolve<{}> {

    constructor(private msUser: MsUserClientService, private router: Router) {
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
    authTokenId: number = null;

    getAuthUser(): Promise<User> {
        return this.msUser.getMe()
            .then(authUserResponse => {
                if (!authUserResponse.user) {
                    throw new Error('no user found');
                }

                this.authUser = authUserResponse.user;
                this.authTokenId = authUserResponse.auth_token_id;

                if (this.authUser.role === 'guest') {
                    this.router.navigate(['/auth', 'procore']);
                    return false;
                }

                return this.authUser;
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

    logout() {
        return this.msUser.logout(this.authUser.id, this.authTokenId)
            .then(() => {
                this.authUser = null;
            });
    }
}

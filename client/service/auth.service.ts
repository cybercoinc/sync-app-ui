import {Injectable} from "@angular/core";
import {MsUserClientService} from './microservices/ms-user-client.service';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {User} from 'client/entities/entities';

@Injectable()
export class AuthService implements Resolve<{}> {

    constructor(private msUser: MsUserClientService, protected router: Router) {
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
        return new Promise((resolve, reject) => {
            if (this.authUser && this.authTokenId) {
                return resolve(this.authUser)
            }

            return this.msUser.getMe()
                .then(authUserResponse => {
                    if (!authUserResponse.user) {
                        return reject('no user found');
                    }

                    this.authUser = authUserResponse.user;
                    this.authTokenId = authUserResponse.auth_token_id;

                    if (this.authUser.role === 'guest') {
                        // todo https://angular.io/docs/ts/latest/guide/router.html#!#resolve-guard

                        this.router.navigate(['/auth', 'procore']);
                        return false;
                    }

                    return resolve(this.authUser);
                })
        });
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

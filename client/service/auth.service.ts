import {Injectable} from "@angular/core";
import {MsUserClientService} from './microservices/ms-user-client.service';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

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

    authUser = null;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    getAuthUser(): Promise<{}> {

        return new Promise<{}>((resolve, reject) => {
            if (!this.authUser) {
                return this.msUser.getMe()
                    .then(authUser => {
                        this.authUser = authUser;

                        return resolve(this.authUser);
                    })
            }

            return resolve(this.authUser);
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

    logout(): void {
        this.authUser = null;
    }
}

import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {User} from 'client/entities/entities';
import {Headers, Http, URLSearchParams, RequestOptions} from '@angular/http';


@Injectable()
export class AuthService implements Resolve<{}> {

    constructor(protected router: Router, protected Http: Http) {
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

            return this.getMe()
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

    getMe() {
        let headers = new Headers({
            'Content-Type': 'application/json',
        });

        let requestOptions = new RequestOptions({
            headers: headers,
            method: 'GET',
            withCredentials: true
        });

        return this.Http.request('http://localhost:3002' + '/me', requestOptions)
            .toPromise()
            .then(response => {
                let resObj = response.json();

                return resObj.result;
            });
    }
}

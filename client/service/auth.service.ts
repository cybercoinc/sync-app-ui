import {Injectable} from "@angular/core";
import {Router} from '@angular/router';
import {User} from 'client/entities/entities';
import {Headers, Http, RequestOptions} from '@angular/http';
import {ConfigService} from "./config.service";


@Injectable()
export class AuthService {

    constructor(protected router: Router, protected Http: Http, protected ConfigService: ConfigService) {
    }

    authUser: User = null;
    authTokenId: number = null;

    getAuthUser(): Promise<User> {
        return new Promise((resolve, reject) => {
            console.log('start auth resolve');

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

        return this.Http.request(this.ConfigService.getServiceUrl('ms-user') + 'me', requestOptions)
            .toPromise()
            .then(response => {
                let resObj = response.json();

                return resObj.result;
            });
    }
}

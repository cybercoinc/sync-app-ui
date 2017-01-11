import {Injectable} from "@angular/core";
import {Router} from '@angular/router';
import {User} from 'client/entities/entities';
import {Headers, Http, RequestOptions, URLSearchParams} from '@angular/http';
import {ConfigService} from "./config.service";


@Injectable()
export class AuthService {

    constructor(protected router: Router, protected Http: Http, protected ConfigService: ConfigService) {
    }

    authUser: User = null;
    authTokenId: number = null;

    getAuthUser(): Promise<User> {
        return new Promise((resolve, reject) => {
            if (this.authUser) {
                return resolve(this.authUser)
            }

            return this.getMe()
                .then(authUserResponse => {
                    if (!authUserResponse.user) {
                        return reject('no user found');
                    }

                    this.authUser = authUserResponse.user;

                    this.authTokenId = authUserResponse.auth_token_id;

                    return resolve(this.authUser);
                })
                .catch(err => reject(err));
        });
    }

    getMe() {
        let headers = new Headers({
            'Content-Type': 'application/json',
        });

        let params = new URLSearchParams();
        params.set('role', 'user');

        let requestOptions = new RequestOptions({
            headers: headers,
            method: 'GET',
            withCredentials: true,
            search: params ? params : null
        });

        return this.Http.request(this.ConfigService.getServiceUrl('ms-user') + 'me', requestOptions)
            .toPromise()
            .then(response => {
                let resObj = response.json();

                return resObj.result;
            });
    }
}

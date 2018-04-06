import {Injectable} from "@angular/core";
import {Router} from '@angular/router';
import {User, Company} from 'client/entities/entities';
import {Headers, Http, RequestOptions, URLSearchParams} from '@angular/http';
import {ConfigService} from "./config.service";


@Injectable()
export class AuthService {

    constructor(protected router: Router, protected Http: Http, protected ConfigService: ConfigService) {
    }

    authUser: User = null;
    authTokenId: number = null;
    company: Company = null;
    userInCompany: any;
    companyBillingStatus: any = null;

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

                    this.userInCompany = authUserResponse.user_in_company;
                    this.company = authUserResponse.company;

                    if (this.userInCompany.has_billing_permission) {
                        return this.getCompanyBillingStatus(this.company.id)
                            .then((result) => {
                                this.companyBillingStatus = result;

                                return resolve(this.authUser);
                            });
                    } else {
                        return resolve(this.authUser);
                    }
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

    getCompanyBillingStatus(companyId) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'auth-token-id': this.authTokenId
        });

        let params = new URLSearchParams();
        params.set('company_id', companyId);

        let requestOptions = new RequestOptions({
            headers: headers,
            method: 'GET',
            search: params ? params : null
        });

        return this.Http.request(this.ConfigService.getServiceUrl('ms-license') + 'billing/company-billing-status', requestOptions)
            .toPromise()
            .then(response => {
                let resObj = response.json();

                return resObj.result;
            });
    }
}

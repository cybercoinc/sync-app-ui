import {Injectable} from "@angular/core";
import {MsUserClientService} from './microservices/ms-user-client.service';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthService implements Resolve<{}> {

    constructor(private msUser: MsUserClientService) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Promise<any> {

        return this.getAuthUser();
    }

    authUser: {} = null;

    getAuthUser(): Promise<{}> {
        const _self = this;

        return new Promise<{}>((resolve, reject) => {
            if (!_self.authUser) {
                return _self.msUser.getMe()
                    .then(function (authUser) {
                        _self.authUser = authUser;

                        return resolve(_self.authUser);
                    })
            }

            return resolve(_self.authUser);
        });
    }
}

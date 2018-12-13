import {Component, OnInit} from '@angular/core'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AuthService} from '../../../service/auth.service';
import {ConfigService} from "../../../service/config.service";
import {MsUserClientService} from "../../../service/microservices/ms-user-client.service";
import {NotificationsService} from "../../notifications/notifications.service";

@Component({
    selector: "auth-desktop",
    templateUrl: `client/modules/auth/auth-desktop/auth-desktop.component.html`
})
export class AuthDesktopComponent implements OnInit {
    constructor(protected MsUserClientService: MsUserClientService,
                protected AuthService: AuthService,
                protected ConfigService: ConfigService,
                protected NotificationsService: NotificationsService,
                private ActivatedRoute: ActivatedRoute) {
    }

    /**
     * On init
     */
    ngOnInit(): Promise<any> {
        let securityToken;
        let sessionToken;

        this.ActivatedRoute.queryParams.subscribe(params => {
            securityToken = params['security_token'];
            sessionToken = params['session_token'];
        });

        let user;

        return this.ConfigService.load()
            .then(() => {
                return this.AuthService.getAuthUser();
            }).then((authUser) => {
                user = authUser;
            })
            .then(() => {
                return this.MsUserClientService.verifyDesktopCredentials(sessionToken, securityToken);
            })
            .then(response => {
                if (!response || !response.isValid) {
                    throw new Error('Security token or Session token were not provided');
                }
            })
            .then(() => {
                if (user.role === 'guest') {
                    localStorage.setItem('security_token', securityToken);
                    localStorage.setItem('session_token', sessionToken);

                    window.location.href = this.MsUserClientService.getProcoreDesktopAuthLink();
                }

                // @todo
                // else if (user.role === 'user') {
                //     this.MsUserClientService.saveDesktopCredentials(sessionToken, securityToken)
                //         .then(() => {
                //             localStorage.removeItem('security_token');
                //             localStorage.removeItem('session_token');
                //
                //             this.NotificationsService.addInfo('Your desktop app authorized. Please back there.');
                //         });
                // }
                return;
            })
            .catch((error) => {
                if (error && error.name === 'Error') {
                    this.NotificationsService.addError(error);
                }
            });
    }
}

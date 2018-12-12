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

        return this.ConfigService.load()
            .then(() => {
                return this.AuthService.getAuthUser();
            }).then((user) => {
                if (user.role === 'guest'){
                    if (!securityToken || !sessionToken) {
                        this.NotificationsService.addError('Security token or Session token were not provided');
                        return;
                    }
                    localStorage.setItem('security_token', securityToken);
                    localStorage.setItem('session_token', sessionToken);

                    window.location.href = this.MsUserClientService.getProcoreDesktopAuthLink();
                }
                return;
            });
    }
}

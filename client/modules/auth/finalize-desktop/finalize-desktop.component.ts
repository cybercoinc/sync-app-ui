import {Component, OnInit} from '@angular/core'
import {AuthService} from '../../../service/auth.service';
import {ConfigService} from "../../../service/config.service";
import {MsUserClientService} from "../../../service/microservices/ms-user-client.service";
import {NotificationsService} from "../../notifications/notifications.service";

@Component({
    selector: "verify-desktop",
    templateUrl: `client/modules/auth/finalize-desktop/finalize-desktop.component.html`
})
export class FinalizeDesktopComponent implements OnInit {
    constructor(protected MsUserClientService: MsUserClientService,
                protected AuthService: AuthService,
                protected ConfigService: ConfigService,
                protected NotificationsService: NotificationsService) {
    }

    /**
     * On init
     */
    ngOnInit(): Promise<any> {
        const securityToken = localStorage.getItem('security_token');
        const sessionToken = localStorage.getItem('session_token');

        return this.ConfigService.load()
            .then(() => {
                return this.AuthService.getAuthUser();
            }).then((user) => {
                if (user.role !== 'guest') {
                   this.MsUserClientService.saveDesktopCredentials(sessionToken, securityToken)
                       .then(() => {
                           localStorage.removeItem('security_token');
                           localStorage.removeItem('session_token');

                           this.NotificationsService.addInfo('Your desktop app authorized. Please back there.');
                       })
                }
                return;
            });
    }
}

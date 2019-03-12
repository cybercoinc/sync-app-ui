import {MsClientService} from "./ms-client.service";
import {Http} from '@angular/http';
import {PendingRequestsService} from "../pending-requests.service";
import {Inject} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "client/service/auth.service";
import {ConfigService} from "client/service/config.service";
import {NotificationsService} from "../../modules/notifications/notifications.service";

export class MsMainClientService extends MsClientService {
        constructor(@Inject(Http) protected Http: Http,
                @Inject(PendingRequestsService) protected PendingRequestsService: PendingRequestsService,
                @Inject(Router) protected router: Router,
                @Inject(AuthService) protected AuthService: AuthService,
                @Inject(NotificationsService) protected NotificationsService: NotificationsService,
                @Inject(ConfigService) protected ConfigService: ConfigService,
    ) {
        super(Http, PendingRequestsService, router, AuthService, ConfigService, NotificationsService);

        this.msName = 'ms-main';
    }

    getAppSettings() {
        return this.makeMsCall('settings', 'GET');
    }
}

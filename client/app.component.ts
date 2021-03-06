import {Component} from "@angular/core";
import {PendingRequestsService} from "./service/pending-requests.service";
import {AuthService} from "./service/auth.service";

@Component({
    selector: 'app',
    templateUrl: 'client/app.component.html',
})

export class AppComponent {
    appName: string = 'Schedule Connector';

    public isShowTrialNotification = true;

    constructor(protected AuthService: AuthService, protected PendingRequestsService: PendingRequestsService) {

    }

    ngOnInit() {
    }

    dismissTrialNotifications () {
        this.isShowTrialNotification = false;
    }
}
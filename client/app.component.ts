import {Component} from "@angular/core";
import {AuthService} from 'client/service/auth.service';
import {User} from 'client/entities/entities';
import {PendingRequestsService} from "./service/peding-requests.service";


@Component({
    selector: 'app',
    templateUrl: 'client/app.component.html',
})

export class AppComponent {
    appName: string = 'Schedule Connector';

    constructor(protected AuthService: AuthService, protected PendingRequestsService: PendingRequestsService) {

    }

    ngOnInit() {
        this.authUser = this.AuthService.authUser;
    }

    authUser: User = null;
}
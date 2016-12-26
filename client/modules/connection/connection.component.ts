import {Component, OnInit} from "@angular/core";
import {MsUserClientService} from 'client/service/microservices/ms-user-client.service';
import {AuthService} from 'client/service/auth.service';
import {User} from 'client/entities/entities';

@Component({
    selector: "connection",
    templateUrl: 'client/modules/connection/connection.component.html',
    styleUrls: ['client/modules/connection/connection.component.css']
})
export class ConnectionComponent implements OnInit {
    me: User = null;

    constructor(protected MsUserClientService: MsUserClientService, protected AuthService: AuthService) {

    }

    ngOnInit() {
        this.me = this.AuthService.authUser;
    }

    getProcoreAuthLink() {
        return this.MsUserClientService.getProcoreAuthLink();

    }

    getSmartsheetAuthLink() {
        return this.MsUserClientService.getSmartsheetAuthLink();
    }

    removeSmartsheetAuth() {
        return this.MsUserClientService.removeSmartsheetAuth(this.AuthService.authUser.id)
            .then(() => {
                this.me.smartsheet_oauth = null;
            })
    }
}

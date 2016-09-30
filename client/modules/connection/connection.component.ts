import {Component, OnInit} from "@angular/core";
import {MsUserClientService} from '../../service/microservices/ms-user-client.service';
import {AuthService} from 'client/service/auth.service';

@Component({
    selector: "connection",
    templateUrl: `client/modules/connection/connection.component.html`,
    styleUrls: ['client/modules/connection/connection.component.css']
})
export class ConnectionComponent implements OnInit {
    me: {} = null;

    constructor(protected MsUserClientService: MsUserClientService, protected AuthService: AuthService) {

    }

    ngOnInit() {
        this.MsUserClientService.getMe()
            .then(me => this.me = me);
    }

    getProcoreAuthLink() {
        return this.AuthService.getProcoreAuthLink();
    }

    getSmartsheetAuthLink() {
        return 'test';
    }
}

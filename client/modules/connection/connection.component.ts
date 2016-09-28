import {Component, OnInit} from "@angular/core";
import {MsUserClientService} from '../../service/microservices/ms-user-client.service'

@Component({
    selector: "connection",
    templateUrl: `client/modules/connection/connection.component.html`,
    styleUrls: ['client/modules/connection/connection.component.css']
})
export class ConnectionComponent implements OnInit {

    me: {};

    constructor(protected MsUserClientService: MsUserClientService) {

    }

    ngOnInit() {
        this.MsUserClientService.getMe()
            .then(me => this.me = me);
    }
}

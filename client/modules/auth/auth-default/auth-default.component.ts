import {Component} from "@angular/core";
import {AuthService} from '../../../service/auth.service';
import {MsUserClientService} from "../../../service/microservices/ms-user-client.service";

@Component({
    selector: "auth-default",
    templateUrl: `client/modules/auth/auth-default/auth-default.component.html`
})
export class AuthDefaultComponent {
    constructor(protected MsUserClientService: MsUserClientService) {
    }

    getDefaultAuth() {
        return this.MsUserClientService.defaultAuth();
    }
}

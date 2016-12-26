import {Component} from "@angular/core";
import {AuthService} from '../../../service/auth.service';
import {MsUserClientService} from "../../../service/microservices/ms-user-client.service";

@Component({
    selector: "auth-procore",
    templateUrl: `client/modules/auth/auth-procore/auth-procore.component.html`
})
export class AuthProcoreComponent {
    constructor(protected MsUserClientService: MsUserClientService) {
    }

    getProcoreAuthLink() {
        return this.MsUserClientService.getProcoreAuthLink();
    }
}

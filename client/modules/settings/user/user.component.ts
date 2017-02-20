import {Component} from "@angular/core";
import {AuthService} from "../../../service/auth.service";
import {MsUserClientService} from "../../../service/microservices/ms-user-client.service";

@Component({
    selector: 'user',
    templateUrl: 'client/modules/settings/user/user.component.html',
    styleUrls: ['client/modules/settings/user/user.component.css']
})
export class UserComponent {
    constructor(protected AuthService: AuthService, protected MsUserClientService: MsUserClientService) {}

    save(): void {
        this.MsUserClientService.update(this.AuthService.authUser.id, {
            is_login_as_allowed: this.AuthService.authUser.is_login_as_allowed
        });
    }
}

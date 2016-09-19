import {Component} from "@angular/core";
import {AuthService} from '../../../service/auth.service';

@Component({
    selector: "auth-default",
    templateUrl: `client/modules/auth/auth-default/auth-default.component.html`
})
export class AuthDefaultComponent {
    constructor(protected authService: AuthService) {
    }

    getDefaultAuth() {
        return this.authService.defaultAuth();
    }
}

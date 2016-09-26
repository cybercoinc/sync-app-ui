import {Component} from "@angular/core";
import {AuthService} from '../../../service/auth.service';

@Component({
    selector: "auth-procore",
    templateUrl: `client/modules/auth/auth-procore/auth-procore.component.html`
})
export class AuthProcoreComponent {
    constructor(protected authService: AuthService) {
    }

    getProcoreAuthLink() {
        return this.authService.getProcoreAuthLink();
    }
}

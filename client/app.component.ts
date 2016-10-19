import {Component} from "@angular/core";
import {AuthService} from 'client/service/auth.service';
import {User} from 'client/entities/entities';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html',
})
export class AppComponent {
    appName: string = 'Schedule Connector';

    constructor(protected AuthService: AuthService) {

    }

    ngOnInit() {
        this.AuthService.getAuthUser()
            .then(authUser => this.authUser = authUser);
    }

    authUser: User = null;
}
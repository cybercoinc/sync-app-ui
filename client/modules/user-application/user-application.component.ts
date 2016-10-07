import {Component, OnInit} from "@angular/core";
import {Component, ViewEncapsulation} from "@angular/core";
import {MdIconRegistry} from '@angular2-material/icon';
import {AuthService} from 'client/service/auth.service';
import {User} from 'client/entities/entities';

@Component({
    selector: 'user-application',
    templateUrl: 'client/modules/user-application/user-application.component.html',
    styleUrls: ['client/modules/user-application/user-application.component.css'],
    viewProviders: [MdIconRegistry],
    encapsulation: ViewEncapsulation.None
})
export class UserApplicationComponent implements OnInit {

    constructor(protected AuthService: AuthService) {

    }

    ngOnInit() {
        this.AuthService.getAuthUser()
            .then(authUser => this.authUser = authUser);
    }

    authUser: User = null;
}
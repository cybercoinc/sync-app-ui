import {Component, OnInit} from "@angular/core";
import {ViewEncapsulation} from "@angular/core";
import {AuthService} from 'client/service/auth.service';
import {User} from 'client/entities/entities';

@Component({
    selector: 'user-application',
    templateUrl: 'client/modules/user-application/user-application.component.html',
    styleUrls: ['client/modules/user-application/user-application.component.css'],
    viewProviders: [

    ],
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
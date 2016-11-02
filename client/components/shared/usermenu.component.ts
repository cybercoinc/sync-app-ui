import { Component, ElementRef } from "@angular/core";
import {AuthService} from 'client/service/auth.service';
import {User} from 'client/entities/entities';

@Component({
    selector: "usermenu",
    host: {
        '(document:click)': 'onClick($event)',
    },
    styles: [
        '.dropdown-menu li a {color:#EBEBEB}',
        '.dropdown-menu li a:hover, .dropdown-menu li a:active {color:#666666}',
        'ul {background-color: #44556b;}'
    ],
    template: `
<ul class="nav navbar-nav navbar-right">
    <li>
        <a href="javascript: void(0);" (click)="showUserMenu = !showUserMenu;">{{authUserEmail}} <i class="material-icons">arrow_drop_down</i></a>
        <ul *ngIf="showUserMenu" class="dropdown-menu" style="display: block;">
            <li><a href="javascript: void(0);"  (click)="showUserMenu = !showUserMenu;">**Company Settings</a></li>
            <li><a [routerLink]="['/connection']" (click)="showUserMenu = !showUserMenu;">Connections</a></li>
            <li><a [routerLink]="['/billing/licenses']" (click)="showUserMenu = !showUserMenu;">Billing Information</a></li>
            <li class="divider"></li>
            <li><a href="javascript: void(0);"  (click)="showUserMenu = !showUserMenu;">**Log out</a></li>
        </ul>
    </li>
</ul>
`,
})
export class UserMenuComponent {

    constructor(protected AuthService: AuthService, private _eref: ElementRef) { }

    showUserMenu: boolean = false;

    authUserEmail: string = '';

    authUser: User = null;

    ngOnInit() {
        this.AuthService.getAuthUser()
            .then(authUser => {
                this.authUser = authUser;
                this.authUserEmail = authUser.email;
            });
    }

    onClick(event) {
        event.stopPropagation();

        if (!this._eref.nativeElement.contains(event.target)){
            this.showUserMenu = false;
        }
    }
}

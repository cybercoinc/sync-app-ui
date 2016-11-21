import {Component, ElementRef, Input} from "@angular/core";
import {AuthService} from 'client/service/auth.service';
import {User} from 'client/entities/entities';

@Component({
    selector: 'usermenu',
    host: {
        '(document:click)': 'onClick($event)',
    },
    styles: [
        '.dropdown-menu li a {color:#EBEBEB}',
        '.dropdown-menu li a:hover, .dropdown-menu li a:active {color:#666666}',
        'ul {background-color: #44556b;}'
    ],
    template: `
<ul class="nav navbar-nav navbar-right" *ngIf="authUser">
    <li>
        <a href="javascript: void(0);" (click)="showUserMenu = !showUserMenu;">{{authUser?.email}} <i class="material-icons">arrow_drop_down</i></a>
        <ul *ngIf="showUserMenu" class="dropdown-menu" style="display: block;">
            <li><a [routerLink]="['/companies/settings']"  (click)="showUserMenu = !showUserMenu;">Company Settings</a></li>
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

    constructor(private _eref: ElementRef) {
    }

    showUserMenu: boolean = false;
    @Input('user') authUser: User;

    onClick(event) {
        event.stopPropagation();

        if (!this._eref.nativeElement.contains(event.target)) {
            this.showUserMenu = false;
        }
    }
}

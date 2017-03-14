import {Component, ElementRef, Input, OnInit} from "@angular/core";
import {User, Company} from 'client/entities/entities';
import {MsUserClientService} from "client/service/microservices/ms-user-client.service";

@Component({
    selector: 'usermenu',
    host: {
        '(document:click)': 'onClick($event)',
    },
    styles: [
        '.dropdown-menu li a {color:#EBEBEB}',
        '.dropdown-menu li a:hover, .dropdown-menu li a:active {color:#666666}',
        'ul {background-color: #44556b;}',
        '.company-name { display: block; text-align: right; padding-right: 10%;}',
        '.as-admin-badge { padding-left: 15px; margin-bottom: -22px; background-color: #e20808; font-weight: bold;}',
        '.usermenu-link { color: #fff !important; font-size: 19px;  padding-top: 32px;  display: inline-flex;  vertical-align: middle;  padding-bottom: 0px;}',
        '.usermenu-link:hover, .usermenu-link:focus {color: #EBEBEB !important;}',
        '.usermenu-link.active {text-decoration: underline !important;}'
    ],
    template: `
<ul class="nav navbar-nav navbar-right" *ngIf="authUser && authUser.role !== 'guest'">
    <li>
        <div *ngIf="isAdmin" class="as-admin-badge">Logged by Admin</div>
        <a class="usermenu-link" href="javascript: void(0);" (click)="showUserMenu = !showUserMenu;">
            {{authUser?.email}}
            <i class="material-icons">arrow_drop_down</i>
        </a>
        <span class="company-name">{{company?.name}}</span> 
        <ul *ngIf="showUserMenu" class="dropdown-menu" style="display: block;">
            <li><a [routerLink]="['/settings']"  (click)="showUserMenu = !showUserMenu;">Settings</a></li>
            <li><a [routerLink]="['/connection']" (click)="showUserMenu = !showUserMenu;">Connections</a></li>
            <li *ngIf="isBillingUser" ><a [routerLink]="['/billing/info']" (click)="showUserMenu = !showUserMenu;">Billing</a></li>
            <li><a [routerLink]="['/auth/select-company']" (click)="showUserMenu = !showUserMenu;">Switch Company</a></li>
            <li class="divider"></li>
            <li><a href="javascript: void(0);"  (click)="logout()">Log out</a></li>
        </ul>
    </li>
</ul>
`,
})
export class UserMenuComponent implements OnInit {
    constructor(private _eref: ElementRef, protected MsUserClientService: MsUserClientService) {
    }

    showUserMenu:  boolean = false;
    isBillingUser: boolean = false;
    isAdmin:       boolean = false;

    @Input('user')    authUser: User;
    @Input('company') company:  Company;

    ngOnInit(): void {
        if (this.authUser && this.authUser.role !== 'guest') {
            Promise.all([
                this.MsUserClientService.getPbrProjects(this.authUser.id),
                this.MsUserClientService.getCompanyPbr(this.company.id)
            ])
                .then(result => {
                    this.isBillingUser = result[0].length > 0 || (result[1] && result[1].id == this.authUser.id);
                });

            this.isAdmin = this.authUser.as_admin;
        }
    }

    onClick(event) {
        event.stopPropagation();

        if (!this._eref.nativeElement.contains(event.target)) {
            this.showUserMenu = false;
        }
    }

    logout() {
        return this.MsUserClientService.logout()
            .then(response => window.location.replace('/'));
    }

}

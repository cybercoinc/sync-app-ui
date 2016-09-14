import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {MsUserClientService} from './service/microservices/ms-user-client.service';
import "rxjs/add/operator/map";

import {MdIconRegistry} from '@angular2-material/icon';

@Component({
    selector: "app",
    template: `
    <md-sidenav-layout class="demo-sidenav-layout">        
        <md-sidenav #start>
            <md-nav-list (click)="start.close()">
              <a md-list-item [routerLink]="['home']">Home</a>
              <a md-list-item [routerLink]="['projects']">Projects</a>
            </md-nav-list>
        </md-sidenav>
          
        <md-toolbar class="main-menu">
            <button md-icon-button (click)="start.open()">
                <md-icon class="md-24" >menu</md-icon>
            </button>
      
          <div class="main-menu">
            <h1>Schedule Connector</h1>
             <!--<button md-button (click)="login()" *ngIf="!authUser" color="primary">Login</button>-->
             <!--<button md-button (click)="logout()" *ngIf="authUser" color="primary">Logout</button>-->
          </div>
        </md-toolbar>
    
          <div class="app-content">
            <router-outlet></router-outlet>
          </div>
</md-sidenav-layout>
`,
    viewProviders: [MdIconRegistry],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
    appName: string = 'Schedule Connector';
    response: Response;

    authUser: {};

    MsUserClientService: MsUserClientService;

    ngOnInit(): void {
        this.MsUserClientService.getMe()
            .then(authUser => this.authUser = authUser);
    }

    constructor(mdIconRegistry: MdIconRegistry, msUserClientService: MsUserClientService) {
        this.MsUserClientService = msUserClientService;

        mdIconRegistry
            .addSvgIcon('thumb-up', '/assets/svg/thumbup-icon.svg')
            .addSvgIconSetInNamespace('core', '/assets/svg/core-icon-set.svg')
            .registerFontClassAlias('fontawesome', 'fa');
    }

    login() {
        // todo
    }

    logout(): void {
        // todo
    }
}
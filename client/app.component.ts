import {Component, ViewChild, ViewEncapsulation} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {SemanticPopupComponent} from "ng-semantic";
import "rxjs/add/operator/map";

import {MdIconRegistry} from '@angular2-material/icon';

@Component({
    selector: "app",
    template: `
    <md-sidenav-layout class="demo-sidenav-layout">
        <md-sidenav #end align="end">
            <md-nav-list>
              <a md-list-item [routerLink]="['home']">Home</a>
              <a md-list-item [routerLink]="['projects']">Projects</a>
              <a md-list-item [routerLink]="['contact']">Contact</a>
            </md-nav-list>
            <button md-button (click)="end.close()">Close</button>
        </md-sidenav>
        
        <md-sidenav #start>
            <md-nav-list>
              <a md-list-item [routerLink]="['home']">Home</a>
              <a md-list-item [routerLink]="['projects']">Projects</a>
              <a md-list-item [routerLink]="['contact']">Contact</a>
            </md-nav-list>
            <button md-button (click)="start.close()">CLOSE</button>
        </md-sidenav>
          
        <md-toolbar class="main-menu" color="primary">
            <button md-icon-button (click)="start.open()">
                <md-icon class="md-24" >menu</md-icon>
            </button>
      
          <div class="main-menu">
            <h1>Schedule Connector</h1>
            <button md-button (click)="end.open()">
              Profile
            </button>
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
export class AppComponent {
    appName: string = "Angular 2 Express";
    user: any = {
        password: "angualr2express",
        username: "john"
    };
    response: Response;
    isLogged: boolean;
    @ViewChild("myPopup") myPopup: SemanticPopupComponent;

    constructor(private http: Http, mdIconRegistry: MdIconRegistry) {
        this.isLogged = !!localStorage.getItem("id_token");

        mdIconRegistry
            .addSvgIcon('thumb-up', '/assets/svg/thumbup-icon.svg')
            .addSvgIconSetInNamespace('core', '/assets/svg/core-icon-set.svg')
            .registerFontClassAlias('fontawesome', 'fa');
    }

    signup() {
        this.http.post("/login/signup", JSON.stringify({
            password: this.user.password,
            username: this.user.username
        }), new RequestOptions({
            headers: new Headers({"Content-Type": "application/json"})
        }))
            .map((res: any) => res.json())
            .subscribe(
                (res: Response) => {
                    this.response = res;
                },
                (error: Error) => {
                    console.log(error);
                }
            );
    }

    login() {
        this.http.post("/login", JSON.stringify({password: this.user.password}), new RequestOptions({
            headers: new Headers({"Content-Type": "application/json"})
        }))
            .map((res: Response) => res.json())
            .subscribe(
                (res: Response & { jwt: string }) => {
                    localStorage.setItem("id_token", res.jwt);
                    this.myPopup.hide();
                    location.reload();
                },
                (error: Error) => {
                    console.log(error);
                }
            );
    }

    logout(): void {
        localStorage.removeItem("id_token");
        location.reload();
    }
}
System.register(["@angular/core", './service/auth.service', "rxjs/add/operator/map", '@angular2-material/icon'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, auth_service_1, icon_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (_1) {},
            function (icon_1_1) {
                icon_1 = icon_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(mdIconRegistry, authService) {
                    this.authService = authService;
                    this.appName = 'Schedule Connector';
                    mdIconRegistry
                        .addSvgIcon('thumb-up', '/assets/svg/thumbup-icon.svg')
                        .addSvgIconSetInNamespace('core', '/assets/svg/core-icon-set.svg')
                        .registerFontClassAlias('fontawesome', 'fa');
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.authService.getAuthUser().then(function (me) { return console.log(me); });
                    this.authService.testProp = 'asdf';
                };
                AppComponent.prototype.login = function () {
                    // todo
                };
                AppComponent.prototype.logout = function () {
                    // todo
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: "app",
                        template: "\n    <md-sidenav-layout class=\"demo-sidenav-layout\">        \n        <md-sidenav #start>\n            <md-nav-list (click)=\"start.close()\">\n              <a md-list-item [routerLink]=\"['home']\">Home</a>\n              <a md-list-item [routerLink]=\"['projects']\">Projects</a>\n            </md-nav-list>\n        </md-sidenav>\n          \n        <md-toolbar class=\"main-menu\">\n            <button md-icon-button (click)=\"start.open()\">\n                <md-icon class=\"md-24\" >menu</md-icon>\n            </button>\n      \n          <div class=\"main-menu\">\n            <h1>Schedule Connector</h1>\n             <!--<button md-button (click)=\"login()\" *ngIf=\"!authUser\" color=\"primary\">Login</button>-->\n             <!--<button md-button (click)=\"logout()\" *ngIf=\"authUser\" color=\"primary\">Logout</button>-->\n          </div>\n        </md-toolbar>\n    \n          <div class=\"app-content\">\n            <router-outlet></router-outlet>\n          </div>\n</md-sidenav-layout>\n",
                        viewProviders: [icon_1.MdIconRegistry],
                        encapsulation: core_1.ViewEncapsulation.None,
                    }), 
                    __metadata('design:paramtypes', [icon_1.MdIconRegistry, auth_service_1.AuthService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map
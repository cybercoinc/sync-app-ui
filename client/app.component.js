System.register(["@angular/core", "@angular/http", "ng-semantic", "rxjs/add/operator/map", "@angular2-material/icon"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, ng_semantic_1, icon_1, AppComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ng_semantic_1_1) {
                ng_semantic_1 = ng_semantic_1_1;
            },
            function (_1) {
            },
            function (icon_1_1) {
                icon_1 = icon_1_1;
            }
        ],
        execute: function () {
            AppComponent = (function () {
                function AppComponent(http, mdIconRegistry) {
                    this.http = http;
                    this.appName = "Angular 2 Express";
                    this.user = {
                        password: "angualr2express",
                        username: "john"
                    };
                    this.isLogged = !!localStorage.getItem("id_token");
                    mdIconRegistry
                        .addSvgIcon('thumb-up', '/assets/svg/thumbup-icon.svg')
                        .addSvgIconSetInNamespace('core', '/assets/svg/core-icon-set.svg')
                        .registerFontClassAlias('fontawesome', 'fa');
                }
                AppComponent.prototype.signup = function () {
                    var _this = this;
                    this.http.post("/login/signup", JSON.stringify({
                        password: this.user.password,
                        username: this.user.username
                    }), new http_1.RequestOptions({
                        headers: new http_1.Headers({ "Content-Type": "application/json" })
                    }))
                        .map(function (res) { return res.json(); })
                        .subscribe(function (res) {
                        _this.response = res;
                    }, function (error) {
                        console.log(error);
                    });
                };
                AppComponent.prototype.login = function () {
                    var _this = this;
                    this.http.post("/login", JSON.stringify({ password: this.user.password }), new http_1.RequestOptions({
                        headers: new http_1.Headers({ "Content-Type": "application/json" })
                    }))
                        .map(function (res) { return res.json(); })
                        .subscribe(function (res) {
                        localStorage.setItem("id_token", res.jwt);
                        _this.myPopup.hide();
                        location.reload();
                    }, function (error) {
                        console.log(error);
                    });
                };
                AppComponent.prototype.logout = function () {
                    localStorage.removeItem("id_token");
                    location.reload();
                };
                return AppComponent;
            }());
            __decorate([
                core_1.ViewChild("myPopup"),
                __metadata("design:type", ng_semantic_1.SemanticPopupComponent)
            ], AppComponent.prototype, "myPopup", void 0);
            AppComponent = __decorate([
                core_1.Component({
                    selector: "app",
                    template: "\n    <md-sidenav-layout class=\"demo-sidenav-layout\">\n        <md-sidenav #end align=\"end\">\n            <md-nav-list>\n              <a md-list-item [routerLink]=\"['home']\">Home</a>\n              <a md-list-item [routerLink]=\"['projects']\">Projects</a>\n              <a md-list-item [routerLink]=\"['contact']\">Contact</a>\n            </md-nav-list>\n            <button md-button (click)=\"end.close()\">Close</button>\n        </md-sidenav>\n        \n        <md-sidenav #start>\n            <md-nav-list>\n              <a md-list-item [routerLink]=\"['home']\">Home</a>\n              <a md-list-item [routerLink]=\"['projects']\">Projects</a>\n            </md-nav-list>\n            <button md-button (click)=\"start.close()\">CLOSE</button>\n        </md-sidenav>\n          \n        <md-toolbar class=\"main-menu\" color=\"primary\">\n            <button md-icon-button (click)=\"start.open()\">\n                <md-icon class=\"md-24\" >menu</md-icon>\n            </button>\n      \n          <div class=\"main-menu\">\n            <h1>Schedule Connector</h1>\n            <button md-button (click)=\"end.open()\">\n              Profile\n            </button>\n          </div>\n        </md-toolbar>\n    \n          <div class=\"app-content\">\n            <router-outlet></router-outlet>\n          </div>\n</md-sidenav-layout>\n",
                    viewProviders: [icon_1.MdIconRegistry],
                    encapsulation: core_1.ViewEncapsulation.None,
                }),
                __metadata("design:paramtypes", [http_1.Http, icon_1.MdIconRegistry])
            ], AppComponent);
            exports_1("AppComponent", AppComponent);
        }
    };
});
//# sourceMappingURL=app.component.js.map
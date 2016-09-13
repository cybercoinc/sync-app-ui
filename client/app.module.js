System.register(["@angular/core", "@angular/platform-browser", "@angular/http", "./app.component", "./routes", "./components/shared/hello.component", "./modules/projects/projects.module", "./modules/home/home.module", "@angular2-material/card", "@angular2-material/button", "@angular2-material/toolbar", "@angular2-material/icon", "@angular2-material/sidenav", "@angular2-material/list", "./service/microservices/ms-project-client.service"], function (exports_1, context_1) {
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
    var core_1, platform_browser_1, http_1, app_component_1, routes_1, hello_component_1, projects_module_1, home_module_1, card_1, button_1, toolbar_1, icon_1, sidenav_1, list_1, ms_project_client_service_1, AppModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (routes_1_1) {
                routes_1 = routes_1_1;
            },
            function (hello_component_1_1) {
                hello_component_1 = hello_component_1_1;
            },
            function (projects_module_1_1) {
                projects_module_1 = projects_module_1_1;
            },
            function (home_module_1_1) {
                home_module_1 = home_module_1_1;
            },
            function (card_1_1) {
                card_1 = card_1_1;
            },
            function (button_1_1) {
                button_1 = button_1_1;
            },
            function (toolbar_1_1) {
                toolbar_1 = toolbar_1_1;
            },
            function (icon_1_1) {
                icon_1 = icon_1_1;
            },
            function (sidenav_1_1) {
                sidenav_1 = sidenav_1_1;
            },
            function (list_1_1) {
                list_1 = list_1_1;
            },
            function (ms_project_client_service_1_1) {
                ms_project_client_service_1 = ms_project_client_service_1_1;
            }
        ],
        execute: function () {
            AppModule = (function () {
                function AppModule() {
                }
                return AppModule;
            }());
            AppModule = __decorate([
                core_1.NgModule({
                    imports: [
                        platform_browser_1.BrowserModule,
                        http_1.HttpModule,
                        projects_module_1.ProjectsModule,
                        home_module_1.HomeModule,
                        card_1.MdCardModule,
                        button_1.MdButtonModule,
                        toolbar_1.MdToolbarModule,
                        icon_1.MdIconModule,
                        sidenav_1.MdSidenavModule,
                        list_1.MdListModule,
                        routes_1.routing,
                    ],
                    providers: [
                        ms_project_client_service_1.MsProjectClientService
                    ],
                    declarations: [
                        hello_component_1.HelloComponent,
                        app_component_1.AppComponent,
                    ],
                    bootstrap: [app_component_1.AppComponent],
                    schemas: [
                        core_1.CUSTOM_ELEMENTS_SCHEMA
                    ]
                }),
                __metadata("design:paramtypes", [])
            ], AppModule);
            exports_1("AppModule", AppModule);
        }
    };
});
//# sourceMappingURL=app.module.js.map
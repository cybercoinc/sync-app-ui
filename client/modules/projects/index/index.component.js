System.register(["@angular/core", '../../../service/microservices/ms-project-client.service'], function(exports_1, context_1) {
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
    var core_1, ms_project_client_service_1;
    var IndexComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ms_project_client_service_1_1) {
                ms_project_client_service_1 = ms_project_client_service_1_1;
            }],
        execute: function() {
            IndexComponent = (function () {
                function IndexComponent(MsProjectClient) {
                    this.MsProjectClient = MsProjectClient;
                }
                IndexComponent.prototype.ngOnInit = function () {
                    this.getActiveProjects();
                };
                IndexComponent.prototype.getActiveProjects = function () {
                    var _this = this;
                    this.MsProjectClient.getActiveProjects().then(function (projects) { return _this.projects = projects; });
                };
                IndexComponent = __decorate([
                    core_1.Component({
                        selector: "index",
                        templateUrl: "client/modules/projects/index/index.component.html"
                    }), 
                    __metadata('design:paramtypes', [ms_project_client_service_1.MsProjectClientService])
                ], IndexComponent);
                return IndexComponent;
            }());
            exports_1("IndexComponent", IndexComponent);
        }
    }
});
//# sourceMappingURL=index.component.js.map
System.register(['@angular/core', "@angular/http", './index/index.component', "./projects.routing"], function(exports_1, context_1) {
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
    var core_1, http_1, index_component_1, projects_routing_1;
    var ProjectsModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (index_component_1_1) {
                index_component_1 = index_component_1_1;
            },
            function (projects_routing_1_1) {
                projects_routing_1 = projects_routing_1_1;
            }],
        execute: function() {
            ProjectsModule = (function () {
                function ProjectsModule() {
                }
                ProjectsModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            http_1.HttpModule,
                            projects_routing_1.routing,
                        ],
                        exports: [],
                        declarations: [index_component_1.IndexComponent, index_component_1.IndexComponent],
                        bootstrap: [index_component_1.IndexComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProjectsModule);
                return ProjectsModule;
            }());
            exports_1("ProjectsModule", ProjectsModule);
        }
    }
});
//# sourceMappingURL=projects.module.js.map
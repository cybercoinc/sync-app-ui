System.register(['@angular/core', "@angular/common", './index/index.component', './projects.component', './project-wizard/project-wizard.component', './project-wizard/choose-procore-project/choose-procore-project.component', "./projects.routing", '@angular2-material/card', '@angular2-material/button', '@angular2-material/toolbar', '@angular2-material/icon', '@angular2-material/sidenav', '@angular2-material/list', '@angular2-material/tabs', '@angular2-material/radio', '@angular2-material/input', '@angular2-material/core'], function(exports_1, context_1) {
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
    var core_1, common_1, index_component_1, projects_component_1, project_wizard_component_1, choose_procore_project_component_1, projects_routing_1, card_1, button_1, toolbar_1, icon_1, sidenav_1, list_1, tabs_1, radio_1, input_1, core_2;
    var ProjectsModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (index_component_1_1) {
                index_component_1 = index_component_1_1;
            },
            function (projects_component_1_1) {
                projects_component_1 = projects_component_1_1;
            },
            function (project_wizard_component_1_1) {
                project_wizard_component_1 = project_wizard_component_1_1;
            },
            function (choose_procore_project_component_1_1) {
                choose_procore_project_component_1 = choose_procore_project_component_1_1;
            },
            function (projects_routing_1_1) {
                projects_routing_1 = projects_routing_1_1;
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
            function (tabs_1_1) {
                tabs_1 = tabs_1_1;
            },
            function (radio_1_1) {
                radio_1 = radio_1_1;
            },
            function (input_1_1) {
                input_1 = input_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            ProjectsModule = (function () {
                function ProjectsModule() {
                }
                ProjectsModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            card_1.MdCardModule,
                            button_1.MdButtonModule,
                            toolbar_1.MdToolbarModule,
                            icon_1.MdIconModule,
                            sidenav_1.MdSidenavModule,
                            list_1.MdListModule,
                            list_1.MdListModule,
                            tabs_1.MdTabsModule,
                            radio_1.MdRadioModule,
                            input_1.MdInputModule,
                            common_1.CommonModule,
                            projects_routing_1.routing,
                        ],
                        exports: [],
                        declarations: [
                            index_component_1.IndexComponent,
                            projects_component_1.ProjectsComponent,
                            project_wizard_component_1.ProjectWizardComponent,
                            choose_procore_project_component_1.ChooseProcoreProjectComponent
                        ],
                        providers: [
                            core_2.MdUniqueSelectionDispatcher
                        ],
                        bootstrap: [projects_component_1.ProjectsComponent]
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
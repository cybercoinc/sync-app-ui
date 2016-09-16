System.register(["@angular/core"], function(exports_1, context_1) {
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
    var core_1;
    var ProjectWizardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ProjectWizardComponent = (function () {
                function ProjectWizardComponent() {
                    this.tabs = [
                        {
                            label: 'Step 1 - Choose Procore project',
                            content: 'procore projects dropdown'
                        },
                        {
                            label: 'Step 2 - Choose Smartsheet project',
                            content: 'procore projects dropdown or NO button'
                        },
                        {
                            label: 'Step 3 - Match Smartsheet column heading',
                            content: 'Smartsheet columns dropdowns to column names'
                        },
                        {
                            label: 'Step 4 - Set billing project name and PRB person',
                            content: 'Custom Billing Project Name/code input, PBR person dropdown, Issue separate invoice checkbox'
                        },
                        {
                            label: 'Step 5 - Final step',
                            content: 'Project status dropdown, task titles include dropdown, private tasks and todos dropdown, working days checkbox, non working days textarea'
                        },
                    ];
                }
                ProjectWizardComponent = __decorate([
                    core_1.Component({
                        selector: "project-wizard",
                        templateUrl: "client/modules/projects/project-wizard/project-wizard.component.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProjectWizardComponent);
                return ProjectWizardComponent;
            }());
            exports_1("ProjectWizardComponent", ProjectWizardComponent);
        }
    }
});
//# sourceMappingURL=project-wizard.component.js.map
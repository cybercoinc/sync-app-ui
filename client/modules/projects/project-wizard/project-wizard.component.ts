import {Component} from "@angular/core";

@Component({
    selector: "project-wizard",
    templateUrl: `client/modules/projects/project-wizard/project-wizard.component.html`,
    styles: [`
            .tab-content {
                padding: 20px;
            }
        `]
})
export class ProjectWizardComponent {
    constructor() {
    }

    processStep(event) {
        this.steps[event.name].result = event.result;
    }

    steps = {
        "CHOOSE_PROCORE_PROJECT": {
            result: null
        },

        "CHOOSE_SMARTSHEET_PROJECT": {
            result: null
        },
    }
}

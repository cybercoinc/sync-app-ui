import {Component, Input} from "@angular/core";

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

    @Input() selectedIndex: number = 0;

    @Input() steps = {
        "CHOOSE_PROCORE_PROJECT": {
            result: null,
            isDisabled: false
        },

        "CHOOSE_SMARTSHEET_PROJECT": {
            result: null,
            isDisabled: true
        },
    };

    showStepNum(num: number) {
        this.selectedIndex = num;
    }
}

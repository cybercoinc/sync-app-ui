import {Component} from "@angular/core";

@Component({
    selector: "project-wizard",
    templateUrl: `client/modules/projects/project-wizard/project-wizard.component.html`
})
export class ProjectWizardComponent {
    constructor() {
    }

    tabs = [
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

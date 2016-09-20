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
}

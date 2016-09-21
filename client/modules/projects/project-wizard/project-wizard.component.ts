import {Component, Input} from "@angular/core";

@Component({
    selector: "project-wizard",
    template: `
    <router-outlet></router-outlet>
  `,
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

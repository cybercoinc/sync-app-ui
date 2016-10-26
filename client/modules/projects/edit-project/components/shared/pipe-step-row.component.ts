import {Component, OnInit, Input} from "@angular/core";

@Component({
    selector: 'pipe-step-row',
    template: `
            <div class="row bottom-lined clickable-row {{getStatusRowClass()}}" [routerLink]="action" routerLinkActive="pipe-step-active">
                <div class="col-xs-12">
                    <div class="pipe-header-average">
                        <i class="material-icons">{{getStatusIcon()}}</i> {{stepName}}
                    </div>
                    <div class="pipe-description">
                        {{stepDescription}}
                    </div>
                </div>
            </div>
             `,
    styleUrls: ['client/modules/projects/edit-project/edit-project.component.css'],
})
export class PipeStepRowComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
    }

    @Input('step-status') stepStatus: 'completed' | 'not-completed' | 'failed';
    @Input('step-name') stepName: string;
    @Input('step-description') stepDescription: string;
    @Input('action') action: string;

    getStatusIcon() {
        switch (this.stepStatus) {
            case "completed":
                return 'check';
            case "not-completed":
                return 'arrow_forward';
            case "failed":
                return 'close';
        }
    }

    getStatusRowClass() {
        switch (this.stepStatus) {
            case "completed":
                return 'step-completed';
            case "not-completed":
                return 'step-not-completed';
            case "failed":
                return 'step-failed';
        }
    }

}

import {Component, OnInit, Input} from "@angular/core";

@Component({
    selector: 'pipe-row',
    template: `
            <div class="row bottom-lined clickable-row" [routerLink]="[routerLink]" routerLinkActive="pipe-step-active">
                <div class="col-xs-12">
                    <div class="pipe-header-average pipe-status-{{pipeStatus}}">
                        <i class="material-icons">{{materialIcon}}</i> {{pipeTitle}}
                    </div>
                    
                    <div class="pipe-description">
                        {{description}}
                    </div>
                </div>
            </div>
             `,
    styleUrls: ['client/modules/projects/edit-project/edit-project.component.css'],
})
export class PipeRowComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
    }

    @Input('material-icon') materialIcon: string;
    @Input('pipe-title') pipeTitle: string;
    @Input('description') description: string;
    @Input('router-link') routerLink: string;
    @Input('status') pipeStatus: string;
}

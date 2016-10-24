import {Component, OnInit, Input} from "@angular/core";

@Component({
    // moduleId: module.id,
    selector: 'pipe-config',
    template: `
            <div class="row bottom-lined clickable-row">
                <div class="col-xs-12">
                    <div class="pipe-header-average">
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
export class PipeConfigComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
    }

    @Input('material-icon') materialIcon: string;
    @Input('pipe-title') pipeTitle: string;
    @Input('description') description: string;
}

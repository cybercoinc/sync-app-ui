import {Component, OnInit, Input} from "@angular/core";

@Component({
    // moduleId: module.id,
    selector: 'pipe-public-todo',
    template: `
                <div class="col-xs-3 right-lined pipe-config-steps">

                    <div class="row bottom-lined clickable-row step-completed">
                        <div class="col-xs-12">
                            <div class="pipe-header-average">
                                <i class="material-icons">check</i> Completed step
                            </div>
                            <div class="pipe-description">
                                Description for Smartsheet Connection. Double rows long text here may be.
                            </div>
                        </div>
                    </div>


                    <div class="row bottom-lined clickable-row step-not-completed">
                        <div class="col-xs-12">
                            <div class="pipe-header-average">
                                <i class="material-icons">arrow_forward</i> Need to complete step
                            </div>
                            <div class="pipe-description">
                                Description for some step.Double rows long text here may be.
                            </div>
                        </div>
                    </div>

                    <div class="row bottom-lined clickable-row step-failed">
                        <div class="col-xs-12">
                            <div class="pipe-header-average">
                                <i class="material-icons">close</i> Failed validation step
                            </div>
                            <div class="pipe-description">
                                Description.
                            </div>
                        </div>
                    </div>

                </div>

                <div class="col-xs-9">
                    public todo settings here
                </div>
             `,
    styleUrls: ['client/modules/projects/edit-project/edit-project.component.css'],
})
export class PipePublicTodoComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
    }

    @Input('material-icon') materialIcon: string;
}

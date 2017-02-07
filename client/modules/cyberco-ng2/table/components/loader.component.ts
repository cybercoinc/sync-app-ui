import {Component, Input} from "@angular/core";

@Component({
    selector: 'loader-spinner',
    template: `<md-spinner md-mode="indeterminate" [class.hide]="!isVisible"></md-spinner>`,
    styles: [`
        md-spinner {
           margin-left: 40%; 
           width: 3%;
           height: 1%;
        }
    `],
})
export class LoaderProgressCircularComponent {
    constructor() {

    }

    @Input('is-visible') isVisible: boolean = false;
}

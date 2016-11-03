import {Component, Input} from "@angular/core";

@Component({
    selector: 'loader-progress-bar',
    template: `<md-progress-bar mode="indeterminate" color="accent" style="position: absolute" [class.hide]="!isVisible"
                     class="demo-progress-bar-margins"></md-progress-bar>`
})
export class LoaderProgressBarComponent {
    constructor() {

    }

    @Input('is-visible') isVisible: boolean = false;
}

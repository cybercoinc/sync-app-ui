import {Component, OnInit, ViewEncapsulation} from "@angular/core";

@Component({
    selector: 'sandbox',
    template: 'sandbox html template',
})
export class SandboxComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
        console.log('sandbox component initialised');
    }
}
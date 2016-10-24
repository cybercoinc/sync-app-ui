import {Component, OnInit} from "@angular/core";

@Component({
    // moduleId: module.id,
    selector: 'sandbox',
    templateUrl: 'client/modules/sandbox/sandbox.component.html',
    styleUrls: ['client/modules/sandbox/sandbox.component.css']
})
export class SandboxComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
        console.log('sandbox component initialised');
    }
}
import {Component, OnInit} from "@angular/core";

@Component({
    moduleId: module.id,
    selector: 'columns-matching',
    templateUrl: 'columns-matching.component.html',
    styleUrls: ['columns-matching.component.css']
})
export class ColumnsMatchingComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
        console.log('columns-matching component initialised');
    }
}
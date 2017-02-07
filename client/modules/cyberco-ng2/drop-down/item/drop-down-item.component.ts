import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'drop-down-item',
    template: '<div (click)="selectItem($event)">{{value}}</div>',
    styles: [`
        :host div {
            width: 100%;
            font-size: 14px;
            padding: 10px;
            cursor: pointer;
            background-color: #fff;
        }
        
        :host div:hover {
            background-color: #f1f1f1;
        }
    `]
})
export class DropDownItemComponent {
    @Input('name')     name:     string;
    @Input('value')    value:    string;

    @Output() select = new EventEmitter();

    selectItem($event) {
        this.select.emit(this);
    }
}

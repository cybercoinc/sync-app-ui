import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'drop-down-item',
    template: '<div (click)="selected($event)">{{value}}</div>',
    styleUrls: ['client/modules/drop-down/item/drop-down-item.component.css']
})
export class DropDownItemComponent {
    @Input('value') value: string;
    @Output() select = new EventEmitter();

    selected(event) {
        this.select.emit(this);
    }
}

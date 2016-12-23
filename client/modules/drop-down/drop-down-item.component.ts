import { Component } from "@angular/core";

@Component({
    selector: 'drop-down-item'
})
export class DropDownItemComponent {
    value: string;

    constructor(value) {
        this.value = value;
    }
}

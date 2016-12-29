import { Component, OnInit } from "@angular/core";
import { DropDownItemComponent } from "../drop-down/item/drop-down-item.component";

@Component({
    template: `
<div class="container">
    <div class="module-header"><h3>UI Demo</h3></div>
    <h4>DropDown</h4>
    <drop-down [items]="items" [searchEnable]="true" [(ngModel)]="items" [placeholder]="'Default item'"></drop-down>
</div>
`
})
export class UiDemoComponent implements OnInit {
    items = [];

    ngOnInit(): void {
        for (let i = 1; i < 10; i++) {
            this.items.push(i);
        }
    }
}

import { Component, OnInit } from "@angular/core";

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
    items;

    ngOnInit(): void {
        this.items = [1,2,3,4,5,6,7,8,9,10];
    }
}

import {Component, OnInit, Input} from "@angular/core";
import {ItemChanges} from 'client/entities/entities';

@Component({
    selector: 'item-changes-row',
    templateUrl: 'client/modules/projects/sync-sessions/item-changes/item-changes-row/item-changes-row.component.html',
    styleUrls: ['client/modules/projects/sync-sessions/item-changes/item-changes.component.css']
})
export class ItemChangesRowComponent implements OnInit {
    constructor() {
    }

    @Input('item-changes') itemChanges: ItemChanges;

    ngOnInit() {
    }

    getSourceIconClass(): string {
        let cl = '';

        switch (this.itemChanges.source) {
            case 'smartsheet':
                cl = 'smartsheet-source-icon';
                break;

            case 'procore':
                cl = 'procore-source-icon';
                break;

            case 'schedule':
                cl = 'schedule-source-icon';
                break;
        }

        return cl;
    }

    getSourceIcon() {
        let icon = '';

        switch (this.itemChanges.source) {
            case 'smartsheet':
                icon = 'arrow_back';
                break;

            case 'schedule':
                icon = 'arrow_back';
                break;

            case 'procore':
                icon = 'arrow_forward';
                break;
        }

        return icon;
    }
}

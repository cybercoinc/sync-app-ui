import {Component, OnInit, Input} from "@angular/core";
import {ItemChanges} from 'client/entities/entities';

@Component({
    selector: 'item-changes-detail',
    templateUrl: 'client/modules/projects/sync-sessions/item-changes/item-changes-detail/item-changes-detail.component.html',
    styleUrls: [
        'client/modules/projects/sync-sessions/item-changes/item-changes-detail/item-changes-detail.component.css',
        'client/modules/projects/sync-sessions/item-changes/item-changes.component.css',
    ]
})
export class ItemChangesDetailComponent implements OnInit {
    constructor() {
    }

    @Input('item-changes') itemChangesObj: ItemChanges;

    ngOnInit() {
        // console.log(this.itemChanges);
    }

    protected propertiesToLabels = [
        {
            property: 'name',
            label: 'Name',
        },
        {
            property: 'percentage',
            label: 'Percentage',
        },
        {
            property: 'start_datetime',
            label: 'Start Datetime',
        },
        {
            property: 'finish_datetime',
            label: 'Finish Datetime',
        },
        {
            property: 'description',
            label: 'Description',
        },
        {
            property: 'assignee',
            label: 'Assignee'
        }
    ];

    needToHideChange(propName) {
        let colorWasChanged = !!this.itemChangesObj.changes.filter(changeObj => {
            return changeObj.property === 'color' && changeObj.new_value !== changeObj.old_value;
        }).shift();

        let nameWasChanged = !!this.itemChangesObj.changes.filter(changeObj => {
            return changeObj.property === 'name' && changeObj.new_value !== changeObj.old_value;
        }).shift();

        return propName === 'name' && colorWasChanged && !nameWasChanged;
    }
}

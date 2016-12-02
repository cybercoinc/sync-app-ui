import {Component, OnInit, Input} from "@angular/core";
import {MsSyncClientService} from 'client/service/microservices/ms-sync-client.service';
import {AuthService} from 'client/service/auth.service';
import {ItemChanges, SyncSession} from 'client/entities/entities';

@Component({
    selector: 'item-changes',
    templateUrl: 'client/modules/projects/sync-sessions/item-changes/item-changes.component.html',
    styleUrls: ['client/modules/projects/sync-sessions/item-changes/item-changes.component.css']
})
export class ItemChangesComponent implements OnInit {
    constructor(protected MsSyncClientService: MsSyncClientService,
                protected AuthService: AuthService) {
    }

    protected formattedItemChangesObj: {
        created_one: ItemChanges[],
        changed_one: ItemChanges[],
        deleted_one: ItemChanges[],
    };

    protected selectedItemChanges: ItemChanges;

    @Input('sync-session') syncSession: SyncSession;

    ngOnInit() {
        this.MsSyncClientService.getItemChangesBySyncSessionsId(this.syncSession.id, this.AuthService.authTokenId)
            .then(itemChangesList => {
                this.formattedItemChangesObj = {
                    created_one: [],
                    changed_one: [],
                    deleted_one: [],
                };

                itemChangesList.forEach((itemChangesObj) => {
                    this.formattedItemChangesObj[itemChangesObj.type].push(itemChangesObj);
                });
            });
    }

    viewDetails(itemChanges) {
        this.selectedItemChanges = itemChanges;
    }

    readonly ITEM_CHANGES_DEFAULT_NUM = 20;

    protected itemChangesToShowNumber = this.ITEM_CHANGES_DEFAULT_NUM;

    viewAll() {
        this.itemChangesToShowNumber = null;
    }

    viewLess() {
        this.itemChangesToShowNumber = this.ITEM_CHANGES_DEFAULT_NUM;
    }

    isFormattedItemChangesObjEmpty(): boolean {
        return this.formattedItemChangesObj.created_one && this.formattedItemChangesObj.created_one.length === 0
            && this.formattedItemChangesObj.changed_one && this.formattedItemChangesObj.changed_one.length === 0
            && this.formattedItemChangesObj.deleted_one && this.formattedItemChangesObj.deleted_one.length === 0
    }
}

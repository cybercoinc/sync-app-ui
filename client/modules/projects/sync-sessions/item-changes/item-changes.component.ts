import {Component, OnInit, Input} from "@angular/core";
import {MsSyncClientService} from 'client/service/microservices/ms-sync-client.service';
import {AuthService} from 'client/service/auth.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ItemChanges, SyncSession} from 'client/entities/entities';

@Component({
    selector: 'item-changes',
    templateUrl: 'client/modules/projects/sync-sessions/item-changes/item-changes.component.html',
    styleUrls: ['client/modules/projects/sync-sessions/item-changes/item-changes.component.css']
})
export class ItemChangesComponent implements OnInit {
    constructor(protected MsSyncClientService: MsSyncClientService,
                protected AuthService: AuthService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    protected itemChangesList: ItemChanges[] = null;

    @Input('sync-session') syncSession: SyncSession;

    ngOnInit() {
        this.MsSyncClientService.getItemChangesBySyncSessionsId(this.syncSession.id, this.AuthService.authUser.auth_session_id)
            .then(itemChangesList => {
                this.itemChangesList = itemChangesList;

                console.log('this.itemChangesList', this.itemChangesList);
            });
    }
}

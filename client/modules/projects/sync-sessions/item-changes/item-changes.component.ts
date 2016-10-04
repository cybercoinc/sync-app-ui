import {Component, OnInit} from "@angular/core";
import {MsSyncClientService} from 'client/service/microservices/ms-sync-client.service';
import {AuthService} from 'client/service/auth.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ItemChanges} from 'client/entities/entities';

@Component({
    selector: "item-changes",
    templateUrl: 'client/modules/projects/sync-sessions/item-changes/item-changes.component.html',
    styleUrls: ['client/modules/projects/sync-sessions/item-changes/item-changes.component.css']
})
export class ItemChangesComponent implements OnInit {
    constructor(protected MsSyncClientService: MsSyncClientService,
                protected AuthService: AuthService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    itemChangesList: [ItemChanges] = null;

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let syncSessionId = +params['sync_session_id'];

            this.MsSyncClientService.getItemChangesBySyncSessionsId(syncSessionId, this.AuthService.authUser.auth_session_id)
                .then(itemChangesList => {
                    this.itemChangesList = this.orderByDate(itemChangesList);
                });
        });
    }

    orderByDate(list: [{created_at}]) { // todo move this to some common pipe filter
        return list.sort(function (b, a) {
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        });
    }
}

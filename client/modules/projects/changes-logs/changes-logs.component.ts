import {Component, OnInit} from "@angular/core";
import {MsSyncClientService} from 'client/service/microservices/ms-sync-client.service';
import {AuthService} from 'client/service/auth.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: "changes-logs",
    templateUrl: `client/modules/projects/changes-logs/changes-logs.component.html`,
    styleUrls: ['client/modules/projects/changes-logs/changes-logs.component.css']
})
export class ChangesLogsComponent implements OnInit {
    constructor(protected MsSyncClientService: MsSyncClientService,
                protected AuthService: AuthService,
                private route: ActivatedRoute,
                private router: Router) {

    }

    syncSessionsList: [{}] = null;

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];

            // this.MsSyncClientService.getSyncSessionsByProjectId(id, this.AuthService.authUser.auth_session_id)
            //     .then(syncSessionsList => {
            //         this.syncSessionsList = this.orderByDate(syncSessionsList);
            //     });
        });
    }

    orderByDate(list: [{created_at}]) { // todo move this to some common pipe filter
        return list.sort(function (b, a) {
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        });
    }
}

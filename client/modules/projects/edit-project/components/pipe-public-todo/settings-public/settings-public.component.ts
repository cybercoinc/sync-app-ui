import {Component, OnInit, Input} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {AuthService} from 'client/service/auth.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Config} from 'client/config';
import {Project, SmartsheetSheet} from 'client/entities/entities';

@Component({
    selector: "settings-public",
    templateUrl: 'client/modules/projects/edit-project/components/pipe-public-todo/settings-public/settings-public.component.html',
    styleUrls: ['client/modules/projects/edit-project/components/pipe-public-todo/settings-public/settings-public.component.css'],
})
export class SettingsPublicComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService,
                protected AuthService: AuthService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {

    }
}

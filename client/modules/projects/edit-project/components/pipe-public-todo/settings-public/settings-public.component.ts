import {Component, OnInit, Input} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {MsSyncClientService} from "client/service/microservices/ms-sync-client.service";
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
                protected MsSyncClientService: MsSyncClientService,
                protected AuthService: AuthService) {
    }

    ngOnInit() {

    }

    public workingDays = {
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: false,
        sun: false
    };

    public nonWorkingDays = '';

    public model: {workingDays: {}, nonWorkingDays: string} = {
        workingDays: this.workingDays,
        nonWorkingDays: this.nonWorkingDays
    };
}

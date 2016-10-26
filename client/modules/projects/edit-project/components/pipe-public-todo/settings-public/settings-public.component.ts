import {Component, OnInit, Input} from "@angular/core";

import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {MsSyncClientService} from "client/service/microservices/ms-sync-client.service";
import {AuthService} from 'client/service/auth.service';
import {PipeConnectionService} from 'client/service/pipe-connection.service';

import {Router, ActivatedRoute, Params} from '@angular/router';
import {Config} from 'client/config';
import {Project, SmartsheetSheet} from 'client/entities/entities';

@Component({
    selector: "settings-public",
    templateUrl: 'client/modules/projects/edit-project/components/pipe-public-todo/settings-public/settings-public.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/pipe-public-todo/settings-public/settings-public.component.css',
        'client/modules/projects/edit-project/edit-project.component.css',
    ],
})
export class SettingsPublicComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService,
                protected MsSyncClientService: MsSyncClientService,
                protected PipeConnectionService: PipeConnectionService,
                protected AuthService: AuthService) {
    }

    ngOnInit() {
        this.pipesListObj = this.PipeConnectionService.pipesListObj;
    }

    protected pipesListObj;

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

    public model: {workingDays: {}, nonWorkingDays: string, summary_tasks_enabled: boolean, colors_coding_enabled: boolean} = {
        workingDays: this.workingDays,
        nonWorkingDays: this.nonWorkingDays,
        summary_tasks_enabled: false,
        colors_coding_enabled: false,
    };

    checkModel() {
        console.log(this.model);
    }

    saveAndContinue() {
        let project = this.PipeConnectionService.project;
        let pipe = this.pipesListObj.public_todos;

        return this.MsProjectClientService.updatePipe(pipe.id, {
            sm_working_days: this.model.workingDays,
            sm_weekends: this.model.nonWorkingDays.split(',')
        }, this.AuthService.authUser.auth_session_id)
            .then(() => {
                console.log('pipe updated');
                return this.PipeConnectionService.refreshPipesList();
            });
    }
}

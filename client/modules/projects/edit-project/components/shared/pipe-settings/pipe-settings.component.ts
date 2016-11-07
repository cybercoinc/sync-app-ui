import {Component, OnInit, Input} from "@angular/core";

import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {AuthService} from 'client/service/auth.service';
import {PipeConnectionService} from 'client/service/pipe-connection.service';

@Component({
    selector: 'pipe-settings',
    templateUrl: 'client/modules/projects/edit-project/components/shared/pipe-settings/pipe-settings.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/shared/pipe-settings/pipe-settings.component.css',
        'client/modules/projects/edit-project/edit-project.component.css',
    ],
})
export class PipeSettingsComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService,
                protected PipeConnectionService: PipeConnectionService,
                protected AuthService: AuthService) {
    }

    ngOnInit() {
        this.pipesListObj = this.PipeConnectionService.pipesListObj;
    }

    @Input('pipe-type') pipeType: 'public_todos' | 'private_todos' | 'tasks';
    @Input('redirect-route') redirectRoute;

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
        return this.PipeConnectionService.createNewOrGetExistingPipe(this.pipeType)
            .then(pipeId => {
                return this.MsProjectClientService.updatePipe(pipeId, {
                    sm_working_days: this.model.workingDays,
                    sm_weekends: this.model.nonWorkingDays.split(',')
                }, this.AuthService.authUser.auth_session_id);
            })
            .then(() => {
                return this.PipeConnectionService.refreshPipesList();
            });
    }
}

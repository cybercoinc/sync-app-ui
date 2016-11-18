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

        if (this.pipesListObj[this.pipeType]) {
            let pipeObj = this.pipesListObj[this.pipeType];

            let propsToSet = [
                'sm_working_days',
                'summary_tasks_enabled',
                'colors_coding_enabled'
            ];

            propsToSet.forEach(propName => {
                if (pipeObj[propName]) {
                    this.model[propName] = pipeObj[propName]
                }
            });

            if (pipeObj.sm_weekends) {
                this.model.sm_weekends = pipeObj.sm_weekends.join(',');
            }
        }
    }

    @Input('pipe-type') pipeType: 'public_todos' | 'private_todos' | 'tasks';

    protected pipesListObj;

    public model: {sm_working_days: {}, sm_weekends: string, summary_tasks_enabled: boolean, colors_coding_enabled: boolean} = {
        sm_working_days: {
            mon: true,
            tue: true,
            wed: true,
            thu: true,
            fri: true,
            sat: false,
            sun: false
        },
        sm_weekends: '',
        summary_tasks_enabled: false,
        colors_coding_enabled: false,
    };

    saveAndContinue() {
        return this.PipeConnectionService.createNewOrGetExistingPipe(this.pipeType)
            .then(pipeId => {
                return this.MsProjectClientService.updatePipe(pipeId, {
                    sm_working_days: this.model.sm_working_days,
                    sm_weekends: this.model.sm_weekends.split(','),
                    summary_tasks_enabled: this.model.summary_tasks_enabled,
                    colors_coding_enabled: this.model.colors_coding_enabled
                }, this.AuthService.authUser.auth_session_id);
            })
            .then(() => {
                return this.PipeConnectionService.refreshPipesList();
            });
    }
}

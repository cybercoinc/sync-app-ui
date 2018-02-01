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
        if (this.PipeConnectionService.pipesListObj[this.pipeType]) {
            let pipeObj = this.PipeConnectionService.pipesListObj[this.pipeType];

            let propsToSet = [
                'summary_tasks_enabled'
            ];

            propsToSet.forEach(propName => {
                if (pipeObj[propName]) {
                    this.model[propName] = pipeObj[propName]
                }
            });

        }
    }

    @Input('pipe-type') pipeType: 'public_todos' | 'private_todos' | 'tasks';

    public model: {summary_tasks_enabled: boolean} = {
        summary_tasks_enabled: false
    };

    saveAndContinue() {
        return this.PipeConnectionService.createNewOrGetExistingPipe(this.pipeType)
            .then(pipeId => {
                return this.MsProjectClientService.updatePipe(pipeId, {
                    summary_tasks_enabled: this.model.summary_tasks_enabled
                });
            })
            .then(() => {
                return this.PipeConnectionService.refreshPipesList();
            });
    }
}

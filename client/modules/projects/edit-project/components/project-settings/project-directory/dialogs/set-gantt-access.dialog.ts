import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MsProjectClientService } from 'client/service/microservices/ms-project-client.service';

@Component({
    selector: 'set-gantt-access-dialog',
    templateUrl: 'client/modules/projects/edit-project/components/project-settings/project-directory/dialogs/set-gantt-access.dialog.html'
})
export class SetGanttAccessDialog implements OnInit {
    constructor(public MdDialogRef: MdDialogRef<SetGanttAccessDialog>, protected MsProjectClientService: MsProjectClientService) {
    }

    ngOnInit() {
        this.MsProjectClientService.getUserToProjectPermissions(this.userId, this.projectId)
            .then(result => {
                this.model['allow_edit_gantt_chart'] = Boolean(result.allow_edit_gantt_chart);

                this.componentIsBusy = false;
            });
    }

    save(): any {
        if (this.componentIsBusy) {
            return false;
        }

        this.componentIsBusy = true;

        return this.MsProjectClientService.setUserToProjectPermissions(this.userId, this.projectId, this.model)
            .then(() => {
                this.MdDialogRef.close();
            });
    }

    componentIsBusy: boolean = true;

    protected model = {};

    public userId: number;
    public projectId: number;
}

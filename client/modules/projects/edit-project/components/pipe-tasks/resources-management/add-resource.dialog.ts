import { Component, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { AuthService } from 'client/service/auth.service';
import { MsProjectClientService } from 'client/service/microservices/ms-project-client.service';
import {MD_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';

@Component({
    selector: 'add-resource',
    templateUrl: 'client/modules/projects/edit-project/components/pipe-tasks/resources-management/add-resource.dialog.html'
})
export class AddResourceDialog {
    constructor(
        public MdDialogRef: MdDialogRef<AddResourceDialog>,
        protected AuthService: AuthService,
        protected MsProjectClientService: MsProjectClientService,
        @Inject(MD_DIALOG_DATA) public data: any) {
    }

    submit(data) {
        this.MsProjectClientService.addResource(data.resource, this.data.projectId)
            .then(() => {
                this.MdDialogRef.close(data);
            });
    }

}

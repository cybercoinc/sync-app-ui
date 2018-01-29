import { Component, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { AuthService } from 'client/service/auth.service';

@Component({
    selector: 'add-resource',
    templateUrl: 'client/modules/projects/edit-project/components/pipe-tasks/resources-management/add-resource.dialog.html'
})
export class AddResourceDialog {
    constructor(public MdDialogRef: MdDialogRef<AddResourceDialog>, protected AuthService: AuthService) {
    }

    submit(resource) {
        this.MdDialogRef.close(resource);
    }

}

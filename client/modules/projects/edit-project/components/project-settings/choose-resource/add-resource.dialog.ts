import {Component, Input} from "@angular/core";
import {MdDialogRef} from "@angular/material";

@Component({
    selector: 'add-resource',
    templateUrl: 'client/modules/projects/edit-project/components/project-settings/choose-resource/add-resource.dialog.html'
})
export class AddResourceDialog{
    constructor(public MdDialogRef: MdDialogRef<AddResourceDialog>) {
    }

    submit(resource) {
        this.MdDialogRef.close(resource);
    }

}

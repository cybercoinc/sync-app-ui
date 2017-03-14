import {Component} from "@angular/core";
import {MdDialogRef} from "@angular/material";

@Component({
    selector: 'create-baseline-dialog',
    templateUrl: 'client/modules/projects/chart/create-baseline.dialog.html',
    styleUrls:  ['client/modules/projects/chart/create-baseline.dialog.css']
})
export class CreateBaselineDialog {
    constructor(public dialogRef: MdDialogRef<CreateBaselineDialog>) {}

    submit(baseline) {
        this.dialogRef.close(baseline);
    }
}

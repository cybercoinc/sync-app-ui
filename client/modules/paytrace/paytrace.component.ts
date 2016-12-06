console.log('1');
import { Component, ViewContainerRef } from "@angular/core";
// import { MdDialogRef, MdDialog, MdDialogConfig } from "@angular/material";
// import { Dialog } from "./dialog.component";

@Component({
    selector: 'pay-trace',
    templateUrl: 'client/modules/paytrace/main.html',
    styleUrls: ['client/modules/paytrace/paytrace.component.css']
})
export class PayTraceComponent {
    // dialogRef: MdDialogRef<any>;

    // constructor(public dialog: MdDialog, public viewContainerRef: ViewContainerRef) {}

    // open() {
    //     let config = new MdDialogConfig();
    //     config.viewContainerRef = this.viewContainerRef;
    //
    //     this.dialogRef = this.dialog.open(Dialog, config);
    //
    //     this.dialogRef.afterClosed().subscribe(result => {
    //         this.dialogRef = null;
    //     });
    // }
}

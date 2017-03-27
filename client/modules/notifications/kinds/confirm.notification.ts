import {BaseNotification} from "./base.notification";
import {Component, Input, OnInit} from "@angular/core";
import {MdDialogRef} from "@angular/material";

@Component({
    selector: 'modal-notification-dialog',
    template: `
        <h1 style="width: 400px;" md-dialog-title>Confirm</h1>
        <div md-dialog-content style="min-height: 40px;line-height: 70px;">
           {{message}}
        </div>
        <div md-dialog-actions>
            <button md-button (click)="close(true)">Yes</button>
            <button md-button (click)="close(false)">No</button>
        </div>
    `
})
export class ConfirmNotificationDialog implements OnInit {
    constructor(public MdDialogRef: MdDialogRef<ConfirmNotificationDialog>) {
    }

    ngOnInit() {

    }

    close(result) {
        return this.MdDialogRef.close(result);
    }

    protected message: string;
}


export class ConfirmNotification extends BaseNotification {
    protected position: 'confirm';

    constructor(mdDialog) {
        super();

        this.mdDialog = mdDialog;
    }

    protected dialogRef;
    protected mdDialog;

    render() {
        this.dialogRef = this.mdDialog.open(ConfirmNotificationDialog);

        this.dialogRef.componentInstance.message = this.message;
    }

    getDialogRef() {
        return this.dialogRef;
    }
}
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
            <button [disabled]="false" md-button>Save</button>
        </div>
    `
})
export class ConfirmNotificationDialog implements OnInit {
    constructor(public MdDialogRef: MdDialogRef<ConfirmNotificationDialog>) {
    }

    ngOnInit() {

    }

    protected message: string;
}


export class ConfirmNotification extends BaseNotification {
    protected position: 'confirm';

    constructor(mdDialog) {
        super();

        this.mdDialog = mdDialog;
    }

    protected component;
    protected mdDialog;

    render() {
        let dialogRef = this.mdDialog.open(ConfirmNotificationDialog);

        dialogRef.componentInstance.message = this.message;
    }
}
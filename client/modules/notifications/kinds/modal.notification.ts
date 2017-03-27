import {BaseNotification} from "./base.notification";
import {MdDialog} from "ng2-material";
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
export class ModalNotificationDialog implements OnInit {
    constructor(public MdDialogRef: MdDialogRef<ModalNotificationDialog>) {
    }

    ngOnInit() {

    }

    protected message: string;

    save(): any {
    }
}


export class ModalNotification extends BaseNotification {
    protected position: 'modal';

    constructor(mdDialog) {
        super();

        this.mdDialog = mdDialog;
    }

    protected component;
    protected mdDialog;

    render() {
        let dialogRef = this.mdDialog.open(ModalNotificationDialog);

        dialogRef.componentInstance.message = this.message;
    }
}
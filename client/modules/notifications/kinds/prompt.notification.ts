import {BaseNotification} from "./base.notification";
import {Component, Input, OnInit} from "@angular/core";
import {MdDialogRef} from "@angular/material";

@Component({
    selector: 'modal-notification-dialog-prompt',
    template: `
        <h1 style="width: 400px;">{{subject}}</h1>
        <div md-dialog-content style="min-height: 40px;line-height: 70px;">
            {{message}} <br />
            <md-input-container style="width:300px;">
                <input mdInput [(ngModel)]="promptValue" />
            </md-input-container>
        </div>
        <div md-dialog-actions>
            <div style="width: 100%">
                <button md-button class="pull-left" (click)="close(true)">Submit</button>
                <button md-button class="pull-right" (click)="close(false)">Cancel</button>
            </div>
        </div>
    `
})
export class PromptNotificationDialog implements OnInit {
    protected message: string;
    protected subject: string;
    public promptValue: string;

    constructor(public MdDialogRef: MdDialogRef<PromptNotificationDialog>) {
    }

    ngOnInit() {

    }

    close(result) {
        if (result && this.promptValue) {
            return this.MdDialogRef.close(this.promptValue);
        } else {
            return this.MdDialogRef.close(false);
        }
    }
}


export class PromptNotification extends BaseNotification {
    protected position: 'confirm';

    constructor(mdDialog) {
        super();

        this.mdDialog = mdDialog;
    }

    protected dialogRef;
    protected mdDialog;

    render() {
        this.dialogRef = this.mdDialog.open(PromptNotificationDialog);

        this.dialogRef.componentInstance.message = this.message;
        this.dialogRef.componentInstance.subject = this.subject;

    }

    getDialogRef() {
        return this.dialogRef;
    }
}
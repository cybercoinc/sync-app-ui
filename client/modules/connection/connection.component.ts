import {Component, OnInit} from "@angular/core";
import {MsUserClientService} from 'client/service/microservices/ms-user-client.service';
import {AuthService} from 'client/service/auth.service';
import {User} from 'client/entities/entities';
import {FormControl, Validators} from "@angular/forms";

@Component({
    selector: "connection",
    templateUrl: 'client/modules/connection/connection.component.html',
    styleUrls: ['client/modules/connection/connection.component.css']
})
export class ConnectionComponent implements OnInit {
    me: User = null;
    microsoftFormControl: FormControl;

    constructor(protected MsUserClientService: MsUserClientService, protected AuthService: AuthService) {

    }

    /**
     * On init
     */
    ngOnInit() {
        this.me = this.AuthService.authUser;

        this.microsoftFormControl = new FormControl(null, [
            Validators.required,
            Validators.pattern('^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$'),
        ]);
    }

    getProcoreAuthLink() {
        return this.MsUserClientService.getProcoreAuthLink();

    }

    getSmartsheetAuthLink() {
        return this.MsUserClientService.getSmartsheetAuthLink();
    }

    /**
     * Get Microsoft auth link
     */
    getMicrosoftAuthLink() {
        if (this.microsoftFormControl.valid) {
            window.location.href = this.MsUserClientService.getMicrosoftAuthLink(this.microsoftFormControl.value);
        }
    }

    /**
     * Remove microsoft auth
     */
    removeMicrosoftAuth() {
        return this.MsUserClientService.removeMicrosoftAuth(this.AuthService.authUser.id)
            .then(() => {
                this.me.microsoft_oauth = null;
            });
    }

    removeSmartsheetAuth() {
        return this.MsUserClientService.removeSmartsheetAuth(this.AuthService.authUser.id)
            .then(() => {
                this.me.smartsheet_oauth = null;
            })
    }
}

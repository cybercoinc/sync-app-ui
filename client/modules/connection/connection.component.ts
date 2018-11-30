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
    microsoftForm: FormControl;

    constructor(protected MsUserClientService: MsUserClientService, protected AuthService: AuthService) {
        this.microsoftForm = new FormControl(null, Validators.required);
    }

    ngOnInit() {
        this.me = this.AuthService.authUser;
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
        if (this.microsoftForm.valid) {
            window.location.href = this.MsUserClientService.getMicrosoftAuthLink(this.microsoftForm.value);
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

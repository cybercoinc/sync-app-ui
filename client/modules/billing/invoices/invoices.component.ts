import {Component, OnInit} from "@angular/core";
import {MsUserClientService} from '../../../service/microservices/ms-user-client.service';
import {AuthService} from '../../../service/auth.service';
import {MsLicenseClientService} from '../../../service/microservices/ms-license-client.service';
import {User} from '../../../entities/entities';

@Component({
    // moduleId: module.id,
    selector: "billingInvoices",
    templateUrl: 'client/modules/billing/invoices/invoices.component.html',
    styleUrls: ['client/modules/billing/invoices/invoices.component.css']
})
export class InvoicesComponent implements OnInit {

    invocesArray = [];

    constructor(protected MsUserClientService: MsUserClientService, protected AuthService: AuthService, protected MsLicenseClientService: MsLicenseClientService) {

    }

    ngOnInit(): void {
        this.getInvoices();
    }

    getInvoices() {
        this.MsLicenseClientService.getInvoices(this.AuthService.authUser.id, this.AuthService.authUser.auth_session_id)
            .then(invocesArray => {
                console.log('licensesList>>>',invocesArray)
                this.invocesArray = invocesArray;
            });
    }



}

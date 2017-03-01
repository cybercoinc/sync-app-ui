import {Component} from "@angular/core";
import {AuthService} from 'client/service/auth.service';
import {MsLicenseClientService} from 'client/service/microservices/ms-license-client.service';
import {Invoice} from "client/entities/entities";

@Component({
    selector: "billingInvoices",
    templateUrl: 'client/modules/billing/invoices/invoices.component.html',
    styleUrls: ['client/modules/billing/invoices/invoices.component.css']
})
export class InvoicesComponent {
    protected invoices: Invoice[];

    constructor(protected AuthService: AuthService, protected MsLicenseClientService: MsLicenseClientService) {
        MsLicenseClientService.getInvoices(this.AuthService.authUser.id)
            .then(invoices => {
                this.invoices = invoices;
            });
    }
}

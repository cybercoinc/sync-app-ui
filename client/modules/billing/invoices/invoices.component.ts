import {Component} from "@angular/core";
import {AuthService} from '../../../service/auth.service';
import {MsLicenseClientService} from '../../../service/microservices/ms-license-client.service';

@Component({
    selector: "billingInvoices",
    templateUrl: 'client/modules/billing/invoices/invoices.component.html',
    styleUrls: ['client/modules/billing/invoices/invoices.component.css']
})
export class InvoicesComponent {
    invoices = [];

    constructor(protected AuthService: AuthService, protected MsLicenseClientService: MsLicenseClientService) {
        MsLicenseClientService.getInvoices(this.AuthService.authUser.id, this.AuthService.authTokenId)
            .then(invoices => {
                this.invoices = invoices;
            });
    }
}

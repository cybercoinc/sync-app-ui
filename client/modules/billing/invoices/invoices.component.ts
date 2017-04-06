import {Component} from "@angular/core";
import {AuthService} from 'client/service/auth.service';
import {MsLicenseClientService} from 'client/service/microservices/ms-license-client.service';
import {Invoice} from "client/entities/entities";
import {ConfigService} from "client/service/config.service";

@Component({
    selector: "billingInvoices",
    templateUrl: 'client/modules/billing/invoices/invoices.component.html',
    styleUrls: ['client/modules/billing/invoices/invoices.component.css']
})
export class InvoicesComponent {
    protected invoices: Invoice[];
    protected printPDFUrl: string;

    constructor(protected AuthService: AuthService,
                protected MsLicenseClientService: MsLicenseClientService,
                protected ConfigService: ConfigService) {
        this.printPDFUrl = this.ConfigService.getServiceUrl(this.MsLicenseClientService.msName) + 'print-invoice-pdf?invoice_id=';

        MsLicenseClientService.getInvoices(this.AuthService.authUser.id, this.AuthService.company.id)
            .then(invoices => {
                this.invoices = invoices;
            });
    }
}

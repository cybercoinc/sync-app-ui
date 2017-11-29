import {Component, OnInit} from "@angular/core";
import {AuthService} from 'client/service/auth.service';
import {MsLicenseClientService} from 'client/service/microservices/ms-license-client.service';
import {Invoice} from "client/entities/entities";
import {ConfigService} from "client/service/config.service";

@Component({
    selector: "billingInvoices",
    templateUrl: 'client/modules/billing/invoices/invoices.component.html',
    styleUrls: ['client/modules/billing/invoices/invoices.component.css']
})
export class InvoicesComponent implements OnInit  {
    protected invoices: Invoice[];
    protected newInvoices: any;
    protected printPDFUrl: string;

    constructor(protected AuthService: AuthService,
                protected MsLicenseClientService: MsLicenseClientService,
                protected ConfigService: ConfigService
    ) {
        this.printPDFUrl = this.ConfigService.getServiceUrl(this.MsLicenseClientService.msName) + 'print-invoice-pdf?invoice_id=';
    }


    ngOnInit(): void {

        this.MsLicenseClientService.getInvoices(this.AuthService.authUser.id, this.AuthService.company.id)
            .then(invoices => {
                this.invoices = invoices;
            });

        this.loadNewInvoices();
    }

    loadNewInvoices () {
        this.MsLicenseClientService.getMyInvoices(this.AuthService.company.id)
            .then(response => {
                this.newInvoices = response;
            });
    }

    getStatusLabel(invoice) {
        switch (invoice.status) {
            case 'sent': return 'SENT';
            case 'paid': return 'PAID';
            case 'overdue': return 'OVERDUE';
            case 'void': return 'VOID';
            case 'draft': return 'DRAFT';
            default: return invoice.status;
        }
    }

    getStatusColor(invoice) {
        switch (invoice.status) {
            case 'sent': return '#155ffc';
            case 'paid': return '#03a803';
            case 'overdue': return '#8b0305';
            case 'void': return '#444';
            case 'draft': return '#444';
            default: return '#444';
        }
    }
}

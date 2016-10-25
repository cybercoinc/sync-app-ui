import {Component, OnInit, Input} from "@angular/core";

@Component({
    selector: 'invoice-card',
    template: `<div class="sc-invoices panel panel-default" >
                    <div class="panel-header">
                        <div class="col-xs-4">
                            {{invoiceNumber}}
                        </div>
                        <div class="col-xs-4">
                            {{invoiceDate}}:{{invoiceAmount}}
                        </div>
                        <div class="col-xs-4">
                            <button class="btn-danger" (click)="alert(invoiceBillDotComId)">Pay Now</button>
                        </div>
                    </div>
                    <div class="panel-body">
                        <p>That is payment for next projects:</p>
                        <p>{{invoiceItemsList}}</p>
                    </div>
                    
               </div>
             `,
    styleUrls: ['client/modules/billing/invoices/invoices.component.css'],
})
export class InvoiceCardComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
    }

    @Input('invoice-id') invoiceId: string;
    @Input('invoice-number') invoiceNumber: string;
    @Input('invoice-bill-dot-com-id') invoiceBillDotComId: string;
    @Input('invoice-amount') invoiceAmount: string;
    @Input('invoice-status') invoiceStatus: string;
    @Input('invoice-date') invoiceDate: string;
    @Input('invoice-items-list') invoiceItemsList: string;
}

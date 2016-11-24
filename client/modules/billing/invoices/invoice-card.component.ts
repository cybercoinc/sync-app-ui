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
                       
                    </div>
                    <br>
                    <div class="panel-body">
                        <div class="col-xs-8">
                            <p>That is payment for next projects:</p>
                            <p>{{projectsList(invoiceItemsList)}}</p>
                        </div>

                        <div class="col-xs-4">
                            <a class="btn btn-danger" href="{{getPayNowUrl(invoiceBillDotComId)}}" target="_blank">Pay Now</a>
                        </div>
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

    projectsList = function (list) {
        //TODO!!! >>>
        return false;
        console.log('list>>>>',list)
        if(!list) return '';
        var links_text  = [];
        list.forEach(item => {
            links_text.push("<a href='#'>"+item+"</a>");
        })
        return links_text.join(', ')
    }
    getPayNowUrl = function (invoiceId) {
        return 'https://app.bill.com/p/00801MAASGBADZVDwzj1?id='+invoiceId // TODO >>> +'&email=anton.demydov%40cyberco.com#'
    }

    @Input('invoice-id') invoiceId: string;
    @Input('invoice-number') invoiceNumber: string;
    @Input('invoice-bill-dot-com-id') invoiceBillDotComId: string;
    @Input('invoice-amount') invoiceAmount: string;
    @Input('invoice-status') invoiceStatus: string;
    @Input('invoice-date') invoiceDate: string;
    @Input('invoice-items-list') invoiceItemsList: string;
}

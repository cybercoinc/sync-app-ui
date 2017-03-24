import {Component, OnInit} from "@angular/core";
import {MdDialog} from "@angular/material";
import {AuthService} from "client/service/auth.service";
import {MsLicenseClientService} from 'client/service/microservices/ms-license-client.service';
import {CreditCard} from "./credit-card";
import {CreditCardDialog} from "./credit-card-dialog/credit-card.dialog";

@Component({
    selector: 'info',
    templateUrl: 'client/modules/billing/info/info.component.html',
    styleUrls: ['client/modules/billing/info/info.component.css'],
})
export class InfoComponent implements OnInit {
    creditCard: CreditCard = new CreditCard();

    constructor(protected MsLicenseClientService: MsLicenseClientService,
                protected AuthService: AuthService,
                protected dialog: MdDialog) {}

    ngOnInit(): void {
        this.MsLicenseClientService.getCreditCard(this.AuthService.authUser.id, this.AuthService.company.id).then(response => {
            if (Object.keys(response).length > 0) {
                this.creditCard = new CreditCard({
                    id:               response.id,
                    maskedCardNumber: response.credit_card.masked_number,
                    customerId:       response.customer_id,
                    expMonth:         response.credit_card.expiration_month,
                    expYear:          response.credit_card.expiration_year
                });
            }
        });
    }

    open() {
        let dialogRef = this.dialog.open(CreditCardDialog);

        dialogRef.componentInstance.creditCard = this.creditCard;
        dialogRef.afterClosed().subscribe(result => {
            if (result != 'close') {
                this.creditCard = result;
            }
        });
    }

    clearCard() {
        this.MsLicenseClientService.removeCard(this.creditCard.id).then(response => {
            this.creditCard = new CreditCard();
        });
    }
}

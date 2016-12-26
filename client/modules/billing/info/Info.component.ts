import { Component, ViewChild } from "@angular/core";
import { AuthService } from "../../../service/auth.service";
import { MsLicenseClientService } from '../../../service/microservices/ms-license-client.service';
import { Dialog } from "../../paytrace/dialog.component";
import { CreditCard } from "../../paytrace/creditCard";

@Component({
    selector: 'info',
    templateUrl: 'client/modules/billing/info/info.component.html',
    styleUrls: ['client/modules/billing/info/info.component.css'],
    providers: [Dialog],
})
export class InfoComponent {
    @ViewChild(Dialog)
    private dialogComponent: Dialog;

    constructor(protected MsLicenseClientService: MsLicenseClientService, protected AuthService: AuthService) {
        MsLicenseClientService.getCreditCard(AuthService.authUser.id).then(response => {
            if (Object.keys(response).length > 0) {
                this.dialogComponent.creditCard = new CreditCard({
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
        this.dialogComponent.isVisible = true;
    }

    updateCard() {
        this.dialogComponent.isVisible = true;
        this.dialogComponent.isUpdate  = true;
    }

    clearCard() {
        this.MsLicenseClientService.removeCard(this.AuthService.authUser.id, this.dialogComponent.creditCard.id).then(response => {
            this.dialogComponent.creditCard = new CreditCard();
        });
    }
}

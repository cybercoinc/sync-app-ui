import { Component, ViewChild } from "@angular/core";
import { AuthService } from "../../../service/auth.service";
import { MsLicenseClientService } from '../../../service/microservices/ms-license-client.service';
import { Dialog, CreditCard } from "../../paytrace/dialog.component";

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
        MsLicenseClientService.getCreditCard(AuthService.authUser.id, this.AuthService.authTokenId).then(response => {
            if (Object.keys(response).length > 0)
                this.dialogComponent.creditCard = new CreditCard(response.id, response.masked_number, response.customer_id);
        });
    }

    open() {
        this.dialogComponent.isVisible = true;
    }

    updateCard() {
        this.dialogComponent.isVisible = true;
    }

    clearCard() {
        this.MsLicenseClientService.removeCard(this.AuthService.authUser.id, this.AuthService.authTokenId, this.dialogComponent.creditCard.id).then(response => {
            this.dialogComponent.creditCard = new CreditCard();
        });
    }
}

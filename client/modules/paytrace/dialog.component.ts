import { Component, Input } from "@angular/core";
import { MsLicenseClientService } from "../../service/microservices/ms-license-client.service";
import { AuthService } from "../../service/auth.service";

declare let paytrace:any;

@Component({
    selector: 'modal-dialog',
    templateUrl: 'client/modules/paytrace/dialog.html',
    styleUrls: ['client/modules/paytrace/dialog.css'],
})
export class Dialog {
    @Input('is-visible') isVisible: boolean = false;

    creditCard = new CreditCard();
    billingEnable: boolean = true;
    errors = [];

    constructor(protected MsLicenseClientService: MsLicenseClientService, protected AuthService: AuthService) {}

    submit() {
        this.MsLicenseClientService.getPemKey(this.AuthService.authUser.id, this.AuthService.authTokenId)
            .then(response => {
                this.creditCard.setKey(response);
                this.creditCard.encrypt();

                this.MsLicenseClientService.createCustomer(this.AuthService.authUser.id, this.AuthService.authTokenId, this.creditCard)
                    .then(response => {
                        if (response.success) {
                            this.creditCard.maskedCardNumber = response.masked_card_number;
                            this.creditCard.customerId = response.customer_id;
                            this.creditCard.id = response.id;
                            this.isVisible = false;
                        }
                        else {
                            this.errors = [];
                            for (let prop in response.errors) {
                                this.errors.push(response.errors[prop][0]);
                            }
                        }
                    });
            });
    }

    closeDialog() {
        return this.isVisible = false;
    }
}

export class CreditCard {
    private paytraceModule = paytrace;
    private pemKey: string;

    name:     string;
    number:   number;
    expMonth: number;
    expYear:  number;
    cvv:      number;

    customerName: string;
    street:       string;
    city:         string;
    state:        string;
    zip:          string;

    encrypted_number: string;
    encrypted_csc:    string;

    constructor(public id?: number, public maskedCardNumber?: string, public customerId?: string) {
    }

    setKey(key) {
        this.paytraceModule.setKey(key);
    }

    encrypt() {
        this.encrypted_number = this.paytraceModule.encryptValue(this.number);
        this.encrypted_csc    = this.paytraceModule.encryptValue(this.cvv);
    }
}

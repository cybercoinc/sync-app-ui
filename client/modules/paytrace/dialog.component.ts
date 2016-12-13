import { Component, Input } from "@angular/core";
import { MsLicenseClientService } from "../../service/microservices/ms-license-client.service";
import { AuthService } from "../../service/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

declare let paytrace:any;

@Component({
    selector: 'modal-dialog',
    templateUrl: 'client/modules/paytrace/dialog.html',
    styleUrls: ['client/modules/paytrace/dialog.css'],
})
export class Dialog {
    @Input('is-visible') isVisible: boolean = false;

    creditCard                = new CreditCard();
    billingEnable: boolean    = false;
    errors                    = [];
    form:          FormGroup;

    constructor(protected MsLicenseClientService: MsLicenseClientService, protected AuthService: AuthService, private fb: FormBuilder) {
        this.form = this.fb.group({
            number: [this.creditCard.number, [
                Validators.required,
                Validators.maxLength(16),
                Validators.minLength(16)
            ]],
            month: ['', [
                Validators.pattern('^([1-9]|[12]\d|1[0-2])$'),
                Validators.required
            ]],
            year: ['', [
                Validators.required
            ]],
            cvv: ['', [
                Validators.required
            ]]
        });

        this.form.valueChanges.subscribe(data => {
            this.errors = [];
        })
    }

    private validate() {
        this.errors = [];

        for (let field in this.form.controls) {
            let control = this.form.get(field);

            for (let err in control.errors) {
                let message = this.validateMessages[field][err];
                this.errors.push(message);
            }
        }

        if (this.errors.length > 0) {
            return false;
        }

        return true;
    }

    submit() {
        if (!this.validate()) {
            return false;
        }

        this.creditCard.number = this.form.value.number;
        this.creditCard.expMonth = this.form.value.month;
        this.creditCard.expYear = this.form.value.year;
        this.creditCard.cvv = this.form.value.cvv;

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

    private validateMessages = {
        number: {
            required: 'Credit card number is required',
            maxlength: 'Credit card number must be sixteen-digit',
            minlength: 'Credit card number must be sixteen-digit'
        },
        month: {
            required: 'Exp. month is required',
            pattern: 'Invalid value for month'
        },
        year: {
            required: 'Exp. year is required'
        },
        cvv: {
            required: 'CVV is required'
        }
    };

    closeDialog() {
        return this.isVisible = false;
    }
}

export class CreditCard {
    private paytraceModule = paytrace;

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

    constructor(public id?: number, public maskedCardNumber?: string, public customerId?: string) {}

    setKey(key) {
        this.paytraceModule.setKey(key);
    }

    encrypt() {
        this.encrypted_number = this.paytraceModule.encryptValue(this.number);
        this.encrypted_csc    = this.paytraceModule.encryptValue(this.cvv);
    }
}

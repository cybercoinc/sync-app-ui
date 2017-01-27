import { Component, Input } from "@angular/core";
import { MsLicenseClientService } from "../../service/microservices/ms-license-client.service";
import { AuthService } from "../../service/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CreditCard } from "./creditCard";

@Component({
    selector: 'modal-dialog',
    templateUrl: 'client/modules/paytrace/dialog.html',
    styleUrls: ['client/modules/paytrace/dialog.css'],
})
export class Dialog {
    @Input('is-visible') isVisible: boolean = false;

    errors                    = [];
    creditCard                = new CreditCard();
    billingEnable: boolean    = false;
    form:          FormGroup;
    isUpdate:      boolean    = false;

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
            ]],
            name: [''],
            street: [''],
            city: [''],
            state: [''],
            zip: ['']
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

        this.createCreditCard();
    }

    private createCreditCard() {
        this.creditCard = new CreditCard({
            number:       this.form.value.number,
            expMonth:     this.form.value.month,
            expYear:      this.form.value.year,
            cvv:          this.form.value.cvv,
            customerName: this.form.value.name,
            street:       this.form.value.street,
            city:         this.form.value.city,
            state:        this.form.value.state,
            zip:          this.form.value.zip,
        });

        this.MsLicenseClientService.getPemKey(this.AuthService.authUser.id)
            .then(response => {
                this.creditCard.setKey(response);
                this.creditCard.encrypt();

                this.MsLicenseClientService.createCreditCard(this.AuthService.authUser.id, this.creditCard)
                    .then(response => {
                        if (response.success) {
                            this.creditCard.maskedCardNumber = response.data.credit_card.masked_number;
                            this.creditCard.customerId = response.data.customer_id;
                            this.creditCard.id = response.data.id;
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



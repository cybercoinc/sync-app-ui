import { Component, Input } from "@angular/core";
import { MsLicenseClientService } from "../../service/microservices/ms-license-client.service";
import { AuthService } from "../../service/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CreditCard, LEVELS_DATA } from "./creditCard";

@Component({
    selector: 'modal-dialog',
    templateUrl: 'client/modules/paytrace/dialog.html',
    styleUrls: ['client/modules/paytrace/dialog.css'],
})
export class Dialog {
    @Input('is-visible') isVisible: boolean = false;

    errors                    = [];
    creditCard                = new CreditCard();
    billingEnable: boolean    = true;
    form:          FormGroup;
    isUpdate:      boolean    = false;

    constructor(protected MsLicenseClientService: MsLicenseClientService, protected AuthService: AuthService, private fb: FormBuilder) {
        this.form = this.fb.group({
            number: [this.creditCard.number, [
                Validators.required,
                Validators.maxLength(16),
                Validators.minLength(15)
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
            customerName: [this.creditCard.customerName, [
                Validators.required
            ]],
            street: [''],
            city: [''],
            state: [''],
            zip: [this.creditCard.zip, [
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

        return this.errors.length < 1;
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
            customerName: this.form.value.customerName,
            street:       this.form.value.street,
            city:         this.form.value.city,
            state:        this.form.value.state,
            zip:          this.form.value.zip,
            levelType:    LEVELS_DATA[this.form.value.number[0]]
        });

        this.MsLicenseClientService.getPemKey(this.AuthService.authUser.id)
            .then(response => {
                this.creditCard.setKey(response);
                this.creditCard.encrypt();

                this.MsLicenseClientService.createCreditCard(this.AuthService.authUser.id, this.AuthService.company.id, this.creditCard)
                    .then(response => {
                        if (response.success) {
                            this.creditCard.maskedCardNumber = response.data.masked_number;
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
            maxlength: 'Maximum length of credit card number must be sixteen-digit',
            minlength: 'Minimum length of credit card number must be fifteen-digit'
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
        },
        customerName: {
            required: 'Customer name is required',
        },
        zip: {
            required: 'Zip is required',
        }
    };

    closeDialog() {
        return this.isVisible = false;
    }
}



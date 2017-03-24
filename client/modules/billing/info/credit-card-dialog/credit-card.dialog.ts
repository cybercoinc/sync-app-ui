import {Component, OnInit} from "@angular/core";
import {MdDialogRef} from "@angular/material";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {LEVELS_DATA, CreditCard} from "../credit-card";
import {MsLicenseClientService} from "client/service/microservices/ms-license-client.service";
import {AuthService} from "client/service/auth.service";

@Component({
    selector: 'credit-card-dialog',
    templateUrl: 'client/modules/billing/info/credit-card-dialog/credit-card.dialog.html',
    styleUrls:  ['client/modules/billing/info/credit-card-dialog/credit-card.dialog.css']
})
export class CreditCardDialog implements OnInit {
    creditCard: CreditCard;
    errors = [];
    form: FormGroup;

    constructor(public dialogRef: MdDialogRef<CreditCardDialog>,
                protected fb: FormBuilder,
                protected MsLicenseClientService: MsLicenseClientService,
                protected AuthService: AuthService) {
    }

    ngOnInit(): void {
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

                return this.MsLicenseClientService.createCreditCard(this.AuthService.authUser.id, this.AuthService.company.id, this.creditCard)
                    .then(response => {
                        if (response.success) {
                            this.creditCard.maskedCardNumber = response.data.masked_number;
                            this.creditCard.customerId = response.data.customer_id;
                            this.creditCard.id = response.data.id;

                            this.dialogRef.close(this.creditCard);
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
}

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
    months = [];
    years = [];
    countries = [
        {"code":"US", "label":"United States"},
        {"code":"CA", "label":"Canada"},
        {"code":"AD", "label":"Andorra"},
        {"code":"AE", "label":"United Arab Emirates"},
        {"code":"AF", "label":"Afghanistan"},
        {"code":"AG", "label":"Antigua and Barbuda"},
        {"code":"AI", "label":"Anguilla"},
        {"code":"AL", "label":"Albania"},
        {"code":"AM", "label":"Armenia"},
        {"code":"AO", "label":"Angola"},
        {"code":"AQ", "label":"Antarctica"},
        {"code":"AR", "label":"Argentina"},
        {"code":"AS", "label":"American Samoa"},
        {"code":"AT", "label":"Austria"},
        {"code":"AU", "label":"Australia"},
        {"code":"AW", "label":"Aruba"},
        {"code":"AX", "label":"Åland Islands"},
        {"code":"AZ", "label":"Azerbaijan"},
        {"code":"BA", "label":"Bosnia and Herzegovina"},
        {"code":"BB", "label":"Barbados"},
        {"code":"BD", "label":"Bangladesh"},
        {"code":"BE", "label":"Belgium"},
        {"code":"BF", "label":"Burkina Faso"},
        {"code":"BG", "label":"Bulgaria"},
        {"code":"BH", "label":"Bahrain"},
        {"code":"BI", "label":"Burundi"},
        {"code":"BJ", "label":"Benin"},
        {"code":"BL", "label":"Saint Barthélemy"},
        {"code":"BM", "label":"Bermuda"},
        {"code":"BN", "label":"Brunei Darussalam"},
        {"code":"BR", "label":"Brazil"},
        {"code":"BS", "label":"Bahamas"},
        {"code":"BT", "label":"Bhutan"},
        {"code":"BV", "label":"Bouvet Island"},
        {"code":"BW", "label":"Botswana"},
        {"code":"BY", "label":"Belarus"},
        {"code":"BZ", "label":"Belize"},
        {"code":"CF", "label":"Central African Republic"},
        {"code":"CG", "label":"Congo"},
        {"code":"CH", "label":"Switzerland"},
        {"code":"CK", "label":"Cook Islands"},
        {"code":"CL", "label":"Chile"},
        {"code":"CM", "label":"Cameroon"},
        {"code":"CN", "label":"China"},
        {"code":"CO", "label":"Colombia"},
        {"code":"CR", "label":"Costa Rica"},
        {"code":"CU", "label":"Cuba"},
        {"code":"CV", "label":"Cabo Verde"},
        {"code":"CW", "label":"Curaçao"},
        {"code":"CX", "label":"Christmas Island"},
        {"code":"CY", "label":"Cyprus"},
        {"code":"CZ", "label":"Czechia"},
        {"code":"DE", "label":"Germany"},
        {"code":"DJ", "label":"Djibouti"},
        {"code":"DK", "label":"Denmark"},
        {"code":"DM", "label":"Dominica"},
        {"code":"DO", "label":"Dominican Republic"},
        {"code":"DZ", "label":"Algeria"},
        {"code":"EC", "label":"Ecuador"},
        {"code":"EE", "label":"Estonia"},
        {"code":"EG", "label":"Egypt"},
        {"code":"EH", "label":"Western Sahara"},
        {"code":"ER", "label":"Eritrea"},
        {"code":"ES", "label":"Spain"},
        {"code":"ET", "label":"Ethiopia"},
        {"code":"FI", "label":"Finland"},
        {"code":"FJ", "label":"Fiji"},
        {"code":"FK", "label":"Falkland Islands (Malvinas)"},
        {"code":"FO", "label":"Faroe Islands"},
        {"code":"FR", "label":"France"},
        {"code":"GA", "label":"Gabon"},
        {"code":"GB", "label":"United Kingdom"},
        {"code":"GD", "label":"Grenada"},
        {"code":"GE", "label":"Georgia"},
        {"code":"GF", "label":"French Guiana"},
        {"code":"GG", "label":"Guernsey"},
        {"code":"GH", "label":"Ghana"},
        {"code":"GI", "label":"Gibraltar"},
        {"code":"GL", "label":"Greenland"},
        {"code":"GM", "label":"Gambia"},
        {"code":"GN", "label":"Guinea"},
        {"code":"GP", "label":"Guadeloupe"},
        {"code":"GQ", "label":"Equatorial Guinea"},
        {"code":"GR", "label":"Greece"},
        {"code":"GS", "label":"South Georgia and the South Sandwich Islands"},
        {"code":"GT", "label":"Guatemala"},
        {"code":"GU", "label":"Guam"},
        {"code":"GW", "label":"Guinea-Bissau"},
        {"code":"GY", "label":"Guyana"},
        {"code":"HK", "label":"Hong Kong"},
        {"code":"HM", "label":"Heard Island and McDonald Islands"},
        {"code":"HN", "label":"Honduras"},
        {"code":"HR", "label":"Croatia"},
        {"code":"HT", "label":"Haiti"},
        {"code":"HU", "label":"Hungary"},
        {"code":"ID", "label":"Indonesia"},
        {"code":"IE", "label":"Ireland"},
        {"code":"IL", "label":"Israel"},
        {"code":"IM", "label":"Isle of Man"},
        {"code":"IN", "label":"India"},
        {"code":"IO", "label":"British Indian Ocean Territory"},
        {"code":"IQ", "label":"Iraq"},
        {"code":"IS", "label":"Iceland"},
        {"code":"IT", "label":"Italy"},
        {"code":"JE", "label":"Jersey"},
        {"code":"JM", "label":"Jamaica"},
        {"code":"JO", "label":"Jordan"},
        {"code":"JP", "label":"Japan"},
        {"code":"KE", "label":"Kenya"},
        {"code":"KG", "label":"Kyrgyzstan"},
        {"code":"KH", "label":"Cambodia"},
        {"code":"KI", "label":"Kiribati"},
        {"code":"KM", "label":"Comoros"},
        {"code":"KN", "label":"Saint Kitts and Nevis"},
        {"code":"KW", "label":"Kuwait"},
        {"code":"KY", "label":"Cayman Islands"},
        {"code":"KZ", "label":"Kazakhstan"},
        {"code":"LA", "label":"Lao People's Democratic Republic"},
        {"code":"LB", "label":"Lebanon"},
        {"code":"LC", "label":"Saint Lucia"},
        {"code":"LI", "label":"Liechtenstein"},
        {"code":"LK", "label":"Sri Lanka"},
        {"code":"LR", "label":"Liberia"},
        {"code":"LS", "label":"Lesotho"},
        {"code":"LT", "label":"Lithuania"},
        {"code":"LU", "label":"Luxembourg"},
        {"code":"LV", "label":"Latvia"},
        {"code":"LY", "label":"Libya"},
        {"code":"MA", "label":"Morocco"},
        {"code":"MC", "label":"Monaco"},
        {"code":"ME", "label":"Montenegro"},
        {"code":"MF", "label":"Saint Martin (French part)"},
        {"code":"MG", "label":"Madagascar"},
        {"code":"MH", "label":"Marshall Islands"},
        {"code":"ML", "label":"Mali"},
        {"code":"MM", "label":"Myanmar"},
        {"code":"MN", "label":"Mongolia"},
        {"code":"MO", "label":"Macao"},
        {"code":"MP", "label":"Northern Mariana Islands"},
        {"code":"MQ", "label":"Martinique"},
        {"code":"MR", "label":"Mauritania"},
        {"code":"MS", "label":"Montserrat"},
        {"code":"MT", "label":"Malta"},
        {"code":"MU", "label":"Mauritius"},
        {"code":"MV", "label":"Maldives"},
        {"code":"MW", "label":"Malawi"},
        {"code":"MX", "label":"Mexico"},
        {"code":"MY", "label":"Malaysia"},
        {"code":"MZ", "label":"Mozambique"},
        {"code":"NA", "label":"Namibia"},
        {"code":"NC", "label":"New Caledonia"},
        {"code":"NE", "label":"Niger"},
        {"code":"NF", "label":"Norfolk Island"},
        {"code":"NG", "label":"Nigeria"},
        {"code":"NI", "label":"Nicaragua"},
        {"code":"NL", "label":"Netherlands"},
        {"code":"NO", "label":"Norway"},
        {"code":"NP", "label":"Nepal"},
        {"code":"NR", "label":"Nauru"},
        {"code":"NU", "label":"Niue"},
        {"code":"NZ", "label":"New Zealand"},
        {"code":"OM", "label":"Oman"},
        {"code":"PA", "label":"Panama"},
        {"code":"PE", "label":"Peru"},
        {"code":"PF", "label":"French Polynesia"},
        {"code":"PG", "label":"Papua New Guinea"},
        {"code":"PH", "label":"Philippines"},
        {"code":"PK", "label":"Pakistan"},
        {"code":"PL", "label":"Poland"},
        {"code":"PM", "label":"Saint Pierre and Miquelon"},
        {"code":"PN", "label":"Pitcairn"},
        {"code":"PR", "label":"Puerto Rico"},
        {"code":"PT", "label":"Portugal"},
        {"code":"PW", "label":"Palau"},
        {"code":"PY", "label":"Paraguay"},
        {"code":"QA", "label":"Qatar"},
        {"code":"RE", "label":"Réunion"},
        {"code":"RO", "label":"Romania"},
        {"code":"RS", "label":"Serbia"},
        {"code":"RU", "label":"Russian Federation"},
        {"code":"RW", "label":"Rwanda"},
        {"code":"SA", "label":"Saudi Arabia"},
        {"code":"SC", "label":"Seychelles"},
        {"code":"SD", "label":"Sudan"},
        {"code":"SE", "label":"Sweden"},
        {"code":"SG", "label":"Singapore"},
        {"code":"SI", "label":"Slovenia"},
        {"code":"SJ", "label":"Svalbard and Jan Mayen"},
        {"code":"SK", "label":"Slovakia"},
        {"code":"SL", "label":"Sierra Leone"},
        {"code":"SM", "label":"San Marino"},
        {"code":"SN", "label":"Senegal"},
        {"code":"SO", "label":"Somalia"},
        {"code":"SR", "label":"Suriname"},
        {"code":"SS", "label":"South Sudan"},
        {"code":"ST", "label":"Sao Tome and Principe"},
        {"code":"SV", "label":"El Salvador"},
        {"code":"SX", "label":"Sint Maarten (Dutch part)"},
        {"code":"SY", "label":"Syrian Arab Republic"},
        {"code":"SZ", "label":"Swaziland"},
        {"code":"TC", "label":"Turks and Caicos Islands"},
        {"code":"TD", "label":"Chad"},
        {"code":"TF", "label":"French Southern Territories"},
        {"code":"TG", "label":"Togo"},
        {"code":"TH", "label":"Thailand"},
        {"code":"TJ", "label":"Tajikistan"},
        {"code":"TK", "label":"Tokelau"},
        {"code":"TL", "label":"Timor-Leste"},
        {"code":"TM", "label":"Turkmenistan"},
        {"code":"TN", "label":"Tunisia"},
        {"code":"TO", "label":"Tonga"},
        {"code":"TR", "label":"Turkey"},
        {"code":"UA", "label":"Ukraine"},
        {"code":"UG", "label":"Uganda"},
        {"code":"UM", "label":"United States Minor Outlying Islands"},
        {"code":"UY", "label":"Uruguay"},
        {"code":"UZ", "label":"Uzbekistan"},
        {"code":"VA", "label":"Holy See (Vatican City State)"},
        {"code":"VC", "label":"Saint Vincent and the Grenadines"},
        {"code":"VN", "label":"Viet Nam"},
        {"code":"VU", "label":"Vanuatu"},
        {"code":"WF", "label":"Wallis and Futuna"},
        {"code":"WS", "label":"Samoa"},
        {"code":"YE", "label":"Yemen"},
        {"code":"YT", "label":"Mayotte"},
        {"code":"ZA", "label":"South Africa"},
        {"code":"ZM", "label":"Zambia"},
        {"code":"ZW", "label":"Zimbabw"}
    ];

    constructor(public dialogRef: MdDialogRef<CreditCardDialog>,
                protected fb: FormBuilder,
                protected MsLicenseClientService: MsLicenseClientService,
                protected AuthService: AuthService) {
    }

    ngOnInit(): void {
        for (let i = 1; i <= 12; i++) {
            this.months.push(i);
        }

        for (let i = 2017; i <= 2030; i++) {
            this.years.push(i);
        }

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
            ]],
            country: [this.creditCard.country, [
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
            country:      this.form.value.country,
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
        },
        country: {
            required: 'Country is required',
        }
    };
}

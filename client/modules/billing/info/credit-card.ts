declare let paytrace:any;

export const LEVELS_DATA = {
    4: 'Visa',
    5: 'MasterCard'
};

export class CreditCard {
    private paytraceModule = paytrace;

    id:               number;
    maskedCardNumber: string;
    customerId:       string;
    name:             string;
    number:           number;
    expMonth:         number;
    expYear:          number;
    cvv:              number;
    levelType:        string;

    customerName: string;
    street:       string;
    city:         string;
    state:        string;
    zip:          string;
    country:      string;

    encrypted_number: string;
    encrypted_csc:    string;

    constructor(props?: {}) {
        for (let value in props) {
            this[value] = props[value];
        }
    }

    setKey(key) {
        this.paytraceModule.setKey(key);
    }

    encrypt() {
        this.encrypted_number = this.paytraceModule.encryptValue(this.number);
        this.encrypted_csc    = this.paytraceModule.encryptValue(this.cvv);
    }
}

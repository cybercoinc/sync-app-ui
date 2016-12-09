import {MsClientService} from "./ms-client.service";
import {Http} from '@angular/http';
import {PendingRequestsService} from "../pending-requests.service";
import {Router} from "@angular/router";
import {CreditCard} from "../../modules/paytrace/dialog.component";

export class MsLicenseClientService extends MsClientService {

    constructor(protected Http: Http, protected PendingRequestsService: PendingRequestsService, protected router: Router) {
        super(Http, PendingRequestsService, router);

        this.url = this.getServiceUrl('ms-license');
    }

    createStartLicense(projectId: number, projectName: string, userId: number, authTokenId): Promise<number> {
        return this.makeMsCall(
            'create-start-license',
            'POST',
            {
                project_id: projectId,
                project_name: projectName,
                user_id: userId,
            },
            authTokenId
        );
    }

    getLicenses(userId, authTokenId): Promise<any> {
        return this.makeMsCall('get-licenses', 'GET', {user_id: userId}, authTokenId);
    }

    getInvoices(userId, authTokenId): Promise<any> {
        return this.makeMsCall('get-invoices', 'GET', {user_id: userId}, authTokenId);
    }

    getCreditCard(userId, authTokenId): Promise<any> {
        return this.makeMsCall('credit-card', 'GET', {user_id: userId}, authTokenId);
    }

    createCustomer(userId, authTokenId, creditCard: CreditCard): Promise<any> {
        return this.makeMsCall(
            'create-customer',
            'POST',
            {
                user_id: userId,
                customerName: creditCard.name,
                number: creditCard.encrypted_number,
                expMonth: creditCard.expMonth,
                expYear:  creditCard.expYear,
                csc: creditCard.encrypted_csc,
                customer_name: creditCard.customerName,
                street: creditCard.street,
                city: creditCard.city,
                state: creditCard.state,
                zip: creditCard.zip,
            },
            authTokenId
        );
    }

    getPemKey(userId, authTokenId): Promise<any> {
        return this.makeMsCall(
            'public-key',
            'GET',
            {
                user_id: userId,
            },
            authTokenId
        );
    }

    removeCard(userId, authTokenId, cardId): Promise<any> {
        return this.makeMsCall(
            'remove-customer',
            'POST',
            {
                user_id: userId,
                card_id: cardId
            },
            authTokenId
        );
    }
}

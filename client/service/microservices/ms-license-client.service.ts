import {MsClientService} from "./ms-client.service";
import {Http} from '@angular/http';
import {PendingRequestsService} from "../pending-requests.service";
import {Router} from "@angular/router";
import {CreditCard} from "../../modules/paytrace/creditCard";
import {Inject} from "@angular/core";
import {AuthService} from "../auth.service";

export class MsLicenseClientService extends MsClientService {

    constructor(@Inject(Http) protected Http: Http,
                @Inject(PendingRequestsService) protected PendingRequestsService: PendingRequestsService,
                @Inject(Router) protected router: Router, @Inject(AuthService) protected AuthService: AuthService) {
        super(Http, PendingRequestsService, router, AuthService);

        this.url = this.getServiceUrl('ms-license');
    }

    createStartLicense(projectId: number, projectName: string, userId: number): Promise<number> {
        return this.makeMsCall(
            'create-standard-license',
            'POST',
            {
                project_id: projectId,
                project_name: projectName,
                user_id: userId,
            }
        );
    }

    getLicenses(userId): Promise<any> {
        return this.makeMsCall('get-licenses', 'GET', {user_id: userId});
    }

    getInvoices(userId): Promise<any> {
        return this.makeMsCall('get-invoices', 'GET', {user_id: userId});
    }

    getCreditCard(userId): Promise<any> {
        return this.makeMsCall('credit-card', 'GET', {user_id: userId});
    }

    createCustomer(userId, creditCard: CreditCard): Promise<any> {
        return this.makeMsCall(
            'create-customer',
            'POST',
            {
                user_id: userId,
                customerName: creditCard.name,
                number: creditCard.encrypted_number,
                expMonth: creditCard.expMonth,
                expYear: creditCard.expYear,
                csc: creditCard.encrypted_csc,
                customer_name: creditCard.customerName,
                street: creditCard.street,
                city: creditCard.city,
                state: creditCard.state,
                zip: creditCard.zip,
            }
        );
    }

    getPemKey(userId): Promise<any> {
        return this.makeMsCall(
            'public-key',
            'GET',
            {
                user_id: userId,
            }
        );
    }

    removeCard(userId, cardId): Promise<any> {
        return this.makeMsCall(
            'remove-customer',
            'POST',
            {
                user_id: userId,
                card_id: cardId
            }
        );
    }
}

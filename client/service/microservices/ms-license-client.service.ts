import {MsClientService} from "./ms-client.service";
import {Http} from '@angular/http';
import {PendingRequestsService} from "../pending-requests.service";
import {Router} from "@angular/router";
import {CreditCard} from "../../modules/paytrace/creditCard";
import {Inject} from "@angular/core";
import {AuthService} from "../auth.service";
import {ConfigService} from "../config.service";
import {Invoice} from "client/entities/entities";

export class MsLicenseClientService extends MsClientService {
    constructor(@Inject(Http) protected Http: Http,
                @Inject(PendingRequestsService) protected PendingRequestsService: PendingRequestsService,
                @Inject(Router) protected router: Router,
                @Inject(AuthService) protected AuthService: AuthService,
                @Inject(ConfigService) protected ConfigService: ConfigService,
    ) {
        super(Http, PendingRequestsService, router, AuthService, ConfigService);

        this.msName = 'ms-license';
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

    getInvoices(userId): Promise<Invoice[]> {
        return this.makeMsCall('get-invoices', 'GET', {user_id: userId});
    }

    getCreditCard(userId): Promise<any> {
        return this.makeMsCall('billing/get-credit-card', 'GET', {user_id: userId});
    }

    createCreditCard(userId, creditCard: CreditCard): Promise<any> {
        return this.makeMsCall(
            'billing/create-credit-card',
            'POST',
            {
                user_id: userId,
                credit_card: {
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

    removeCard(cardId): Promise<any> {
        return this.makeMsCall(
            'billing/remove-credit-card',
            'DELETE',
            {
                card_id: cardId
            }
        );
    }
}

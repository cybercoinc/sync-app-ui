import {MsClientService} from "./ms-client.service";
import {Http} from '@angular/http';
import {PendingRequestsService} from "../pending-requests.service";
import {Router} from "@angular/router";
import {Inject} from "@angular/core";
import {AuthService} from "../auth.service";
import {ConfigService} from "../config.service";
import {Invoice} from "client/entities/entities";
import {NotificationsService} from "client/modules/notifications/notifications.service";
import {CreditCard} from "client/modules/billing/info/credit-card";

export class MsLicenseClientService extends MsClientService {
    constructor(@Inject(Http) protected Http: Http,
                @Inject(PendingRequestsService) protected PendingRequestsService: PendingRequestsService,
                @Inject(Router) protected router: Router,
                @Inject(AuthService) protected AuthService: AuthService,
                @Inject(NotificationsService) protected NotificationsService: NotificationsService,
                @Inject(ConfigService) protected ConfigService: ConfigService,
    ) {
        super(Http, PendingRequestsService, router, AuthService, ConfigService, NotificationsService);

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

    getLicenses(userId, companyId): Promise<any> {
        return this.makeMsCall('get-licenses', 'GET', {user_id: userId, company_id: companyId});
    }

    getInvoices(userId, companyId): Promise<Invoice[]> {
        return this.makeMsCall(
            'get-invoices',
            'GET',
            {
                user_id: userId,
                company_id: companyId,
            }
        );
    }

    getCreditCard(userId, companyId): Promise<any> {
        return this.makeMsCall('billing/get-credit-card', 'GET', {user_id: userId, company_id: companyId});
    }

    createCreditCard(userId, companyId, creditCard: CreditCard): Promise<any> {
        return this.makeMsCall(
            'billing/create-credit-card',
            'POST',
            {
                user_id: userId,
                company_id: companyId,
                credit_card: {
                    number: creditCard.encrypted_number,
                    expMonth: creditCard.expMonth,
                    expYear: creditCard.expYear,
                    csc: creditCard.encrypted_csc,
                    customer_name: creditCard.customerName,
                    street: creditCard.street,
                    city: creditCard.city,
                    state: creditCard.state,
                    zip: creditCard.zip,
                    country: creditCard.country,
                },
                level_type: creditCard.levelType
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

    getMySubsciptions(companyId): Promise<any> {
        return this.makeMsCall(
            'billing/get-my-subscriptions',
            'GET',
            {
                company_id: companyId
            }
        );
    }

    getMyInvoices(companyId): Promise<any> {
        return this.makeMsCall(
            'billing/get-my-invoices',
            'GET',
            {
                company_id: companyId
            }
        );
    }

    getHPUpdateCard(companyId, zohoSubscriptionId): Promise<any> {
        return this.makeMsCall(
            'billing/get-hp-update-card',
            'GET',
            {
                company_id: companyId,
                zoho_subscription_id: zohoSubscriptionId
            }
        );
    }

    cancelSubscription(companyId, zohoSubscriptionId): Promise<any> {
        return this.makeMsCall(
            'billing/cancel-subscription',
            'PUT',
            {
                company_id: companyId,
                zoho_subscription_id: zohoSubscriptionId
            }
        );
    }

    reactivateSubscription(companyId, zohoSubscriptionId): Promise<any> {
        return this.makeMsCall(
            'billing/reactivate-subscription',
            'PUT',
            {
                company_id: companyId,
                zoho_subscription_id: zohoSubscriptionId
            }
        );
    }

    getCompanyBillingUsers(companyId): Promise<any> {
        return this.makeMsCall(
            'billing/'+companyId+'/billing-users',
            'GET'
        );
    }

    addExtraBillingUser(companyId, userId): Promise<any> {
        return this.makeMsCall(
            'billing/'+companyId+'/billing-users',
            'POST',
            {
                user_id: userId
            }
        );
    }

    deleteExtraBillingUser(companyId, userId): Promise<any> {
        return this.makeMsCall(
            'billing/'+companyId+'/billing-users/'+userId,
            'DELETE',
            null
        );
    }

    watchSubscription(companyId, subscriptionId): Promise<any> {
        return this.makeMsCall(
            'billing/'+companyId+'/watch-subscription',
            'POST',
            {
                subscription_id: subscriptionId
            }
        );
    }

    stopWatchSubscription(companyId, subscriptionId): Promise<any> {
        return this.makeMsCall(
            'billing/'+companyId+'/watch-subscription-stop',
            'POST',
            {
                subscription_id: subscriptionId
            }
        );
    }

}

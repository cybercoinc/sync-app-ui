import {Component, OnInit} from "@angular/core";
import {MdDialog} from "@angular/material";
import {AuthService} from "client/service/auth.service";
import {NotificationsService} from "client/modules/notifications/notifications.service";
import {MsLicenseClientService} from 'client/service/microservices/ms-license-client.service';
import {CreditCard} from "./credit-card";
import {CreditCardDialog} from "./credit-card-dialog/credit-card.dialog";

@Component({
    selector: 'info',
    templateUrl: 'client/modules/billing/info/info.component.html',
    styleUrls: ['client/modules/billing/info/info.component.css'],
})
export class InfoComponent implements OnInit {
    creditCard: CreditCard = new CreditCard();
    mySubsciptions: any;

    constructor(protected msLicenseClientService: MsLicenseClientService,
                protected AuthService: AuthService,
                protected notificationService: NotificationsService,
                protected dialog: MdDialog
    ) {
        this.mySubsciptions = {};
    }

    ngOnInit(): void {
        this.msLicenseClientService.getCreditCard(this.AuthService.authUser.id, this.AuthService.company.id).then(response => {
            if (Object.keys(response).length > 0) {
                this.creditCard = new CreditCard({
                    id:               response.id,
                    maskedCardNumber: response.credit_card.masked_number,
                    customerId:       response.customer_id,
                    expMonth:         response.credit_card.expiration_month,
                    expYear:          response.credit_card.expiration_year
                });
            }
        });
        this.loadSubscriptions();
    }

    loadSubscriptions () {

        this.msLicenseClientService.getMySubsciptions(this.AuthService.company.id)
            .then(response => {
                this.mySubsciptions = response;
            });
    }

    open() {
        let dialogRef = this.dialog.open(CreditCardDialog);

        dialogRef.componentInstance.creditCard = this.creditCard;
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.creditCard = result;
            }
        });
    }

    clearCard() {
        this.msLicenseClientService.removeCard(this.creditCard.id).then(response => {
            this.creditCard = new CreditCard();
        });
    }


    updateSubscriptionCard(subscription) {

        this.msLicenseClientService.getHPUpdateCard(this.AuthService.company.id, subscription.subscription_id)
            .then(hostedPage => {
                if (hostedPage.url) {
                    window.location.href = hostedPage.url;
                }
            });
    }

    cancelSubscription(subscription) {
        let dialogRef = this.notificationService.addConfirm('Are you sure?');

        dialogRef
            .afterClosed()
            .subscribe(res => {
                if (res) {
                    return this.msLicenseClientService.cancelSubscription(this.AuthService.company.id, subscription.subscription_id)
                        .then(updatedSubscription => {
                            if (['non_renewing', 'cancelled'].indexOf(updatedSubscription.status) !== -1 ) {
                                this.notificationService.addInfo('Subscription Cancelled');
                                this.loadSubscriptions();
                            } else {
                                this.notificationService.addError('Something went wrong. Action not finished.');
                            }
                        });
                }
            });
    }

    reactivateSubscription(subscription) {

        let dialogRef = this.notificationService.addConfirm('Are you sure?');

        dialogRef
            .afterClosed()
            .subscribe(res => {
                if (res) {
                    return this.msLicenseClientService.reactivateSubscription(this.AuthService.company.id, subscription.subscription_id)
                        .then(updatedSubscription => {
                            if (['live', 'trial'].indexOf(updatedSubscription.status) !== -1 ) {
                                this.notificationService.addInfo('Subscription Reactivated');
                                this.loadSubscriptions();
                            } else {
                                this.notificationService.addError('Something went wrong. Action not finished.');
                            }
                        });
                }
            });
    }

    startWatchingSubscription (subscription) {
        this.msLicenseClientService.watchSubscription(this.AuthService.company.id, subscription.subscription_id)
            .then(response => {
                this.notificationService.addInfo('Watching activated');
                this.loadSubscriptions();
            });
    }

    stopWatchingSubscription (subscription) {
        this.msLicenseClientService.stopWatchSubscription(this.AuthService.company.id, subscription.subscription_id)
            .then(response => {
                this.notificationService.addInfo('Watching stopped');
                this.loadSubscriptions();
            });
    }

    isIamAlreadyWatching(subscription) {

        let response = false;

        subscription.contactpersons.forEach((person) => {
            if (person.email == this.AuthService.authUser.email) {
                response = true;
            }
        });

        return response;
    }

    isCancellable(subscription) {
        switch (subscription.status) {
            case 'cancelled':
            case 'non_renewing':
                return false;
            case 'trial':
            case 'live':
            default:
                return true;
        }
    }

    isRenewable(subscription) {
        switch (subscription.status) {
            case 'non_renewing':
                return true;
            case 'cancelled':
            case 'trial':
            case 'live':
            default:
                return false;
        }
    }

    getStatusLabel(subscription) {
        switch (subscription.status) {
            case 'trial': return 'TRIAL';
            case 'live': return 'LIVE';
            case 'cancelled': return 'CANCELLED';
            case 'non_renewing': return 'NON RENEWING';
            default: return subscription.status;
        }
    }

    getStatusColor(subscription) {
        switch (subscription.status) {
            case 'trial': return '#155ffc';
            case 'live': return '#03a803';
            case 'cancelled': return '#444';
            case 'non_renewing': return '#444';
            default: return '#444';
        }
    }
}

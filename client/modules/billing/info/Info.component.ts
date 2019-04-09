import {Component, OnInit} from "@angular/core";
import {MdDialog} from "@angular/material";
import {AuthService} from "client/service/auth.service";
import {NotificationsService} from "client/modules/notifications/notifications.service";
import {MsLicenseClientService} from 'client/service/microservices/ms-license-client.service';
import {MsUserClientService} from "client/service/microservices/ms-user-client.service";
// import {CreditCard} from "./credit-card";
// import {CreditCardDialog} from "./credit-card-dialog/credit-card.dialog";
import {MdSnackBar} from "@angular/material";

@Component({
    selector: 'info',
    templateUrl: 'client/modules/billing/info/info.component.html',
    styleUrls: ['client/modules/billing/info/info.component.css'],
})
export class InfoComponent implements OnInit {
    // creditCard: CreditCard = new CreditCard();
    mySubsciptions: any;
    currentUser: any;
    companyInfo: any;

    constructor(protected msLicenseClientService: MsLicenseClientService,
                protected msUserClientService: MsUserClientService,
                protected authService: AuthService,
                protected notificationService: NotificationsService,
                protected dialog: MdDialog,
                protected snackBar: MdSnackBar
    ) {
        this.mySubsciptions = {};
        this.companyInfo = {};
        this.currentUser = authService.authUser;
    }

    ngOnInit(): void {
        // this.msLicenseClientService.getCreditCard(this.authService.authUser.id, this.authService.company.id).then(response => {
        //     if (Object.keys(response).length > 0) {
        //         this.creditCard = new CreditCard({
        //             id:               response.id,
        //             maskedCardNumber: response.credit_card.masked_number,
        //             customerId:       response.customer_id,
        //             expMonth:         response.credit_card.expiration_month,
        //             expYear:          response.credit_card.expiration_year
        //         });
        //     }
        // });
        this.loadSubscriptions();
        this.loadCompanyInfo();
    }

    loadSubscriptions () {

        this.msLicenseClientService.getMySubsciptions(this.authService.company.id)
            .then(response => {
                this.mySubsciptions = response;
            });
    }

    loadCompanyInfo() {
        return this.msUserClientService.getCompany(this.authService.company.id)
            .then(company => {
                this.companyInfo = company;
            });
    }

    // open() {
    //     let dialogRef = this.dialog.open(CreditCardDialog);
    //
    //     dialogRef.componentInstance.creditCard = this.creditCard;
    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result) {
    //             this.creditCard = result;
    //         }
    //     });
    // }

    // clearCard() {
    //     this.msLicenseClientService.removeCard(this.creditCard.id).then(response => {
    //         this.creditCard = new CreditCard();
    //     });
    // }

    hasPrimaryPermission() {

        if (this.companyInfo && this.companyInfo.pbr) {
            return this.companyInfo.pbr.id === this.currentUser.id;
        }

        return false;
    }

    updateSubscriptionCard(subscription) {

        this.msLicenseClientService.getHPUpdateCard(this.authService.company.id, subscription.subscription_id)
            .then(hostedPage => {
                if (hostedPage.url) {
                    window.location.href = hostedPage.url;
                }
            });
    }

    createSubscriptionCard(subscription) {

        this.msLicenseClientService.getNewSubscriptionHostedPage(this.authService.company.id)
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
                    return this.msLicenseClientService.cancelSubscription(this.authService.company.id, subscription.subscription_id)
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
                    return this.msLicenseClientService.reactivateSubscription(this.authService.company.id, subscription.subscription_id)
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

    startWatchingSubscription (subscription, email) {
        this.msLicenseClientService.watchSubscription(this.authService.company.id, subscription.subscription_id, email)
            .then(response => {
                this.snackBar.open('Watching activated', 'Close', {
                    duration: 2000,
                    extraClasses: ['alert-success']
                });
                this.loadSubscriptions();
            });
    }

    stopWatchingSubscription (subscription, email) {
        this.msLicenseClientService.stopWatchSubscription(this.authService.company.id, subscription.subscription_id, email)
            .then(response => {

                this.snackBar.open(response.message, 'Close', {
                    duration: 2000,
                    extraClasses: ['alert-success']
                });
                this.loadSubscriptions();
            });
    }

    addSubscriptionWatcher (subscription) {
        let dialogRef = this.notificationService.addPrompt('',
            'Provide email address of additional user that should receive billing related notifications.');

        dialogRef
            .afterClosed()
            .subscribe(emailToAdd => {

                if (!emailToAdd) {
                    return ;
                }

                if (!/^[0-9a-zA-Z\-\.\+]+@[0-9a-zA-Z\-\.]+$/.test(emailToAdd) ) {
                    this.notificationService.addError('Wrong email format.');
                    return ;
                }
                emailToAdd = emailToAdd.toLowerCase();

                if (this.isAlreadyWatching(subscription, emailToAdd)) {
                    this.notificationService.addError('This user already in watchers list.');
                    return ;
                }

                this.startWatchingSubscription(subscription, emailToAdd);

            });
    }

    isAlreadyWatching(subscription, email) {

        let response = false;

        subscription.contactpersons.forEach((person) => {
            if (person.email == email) {
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

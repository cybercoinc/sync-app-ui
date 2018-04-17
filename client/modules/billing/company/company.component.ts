import {Component, OnInit} from "@angular/core";
import {AuthService} from "client/service/auth.service";
import {User} from "client/entities/entities";
import {MsUserClientService} from "client/service/microservices/ms-user-client.service";
import {MsLicenseClientService} from "client/service/microservices/ms-license-client.service";
import {FormControl} from "@angular/forms";
import {MdSnackBar} from "@angular/material";

@Component({
    selector: 'company',
    templateUrl: 'client/modules/billing/company/company.component.html',
    styleUrls: ['client/modules/billing/company/company.component.css'],
})
export class CompanyComponent implements OnInit {
    userCtrl: FormControl;
    filtered: any;

    billingUsers: any;

    currentPBRUser: any;
    extraBillingReceivers: string;
    pbrId = null;
    company = null;
    usersList = [];
    ddUsersList = [];
    private isBillingUser: boolean = false;
    isEditMode: boolean = false;
    me: User = null;

    constructor(protected msUserClientService: MsUserClientService,
                protected msLicenseClientService: MsLicenseClientService,
                protected AuthService:         AuthService,
                protected snackBar:        MdSnackBar
    ) {
        this.userCtrl = new FormControl();
        this.filtered = this.userCtrl.valueChanges
            .startWith(null)
            .map(name => this.filterUsers(name));
    }

    ngOnInit(): void {
        this.getSettings()
            .then(() => {
                this.isBillingUser = (this.AuthService.authUser.id == this.pbrId);
            });

        this.loadBillingUsers();
    }

    loadBillingUsers (): void {

        this.msLicenseClientService.getCompanyBillingUsers(this.AuthService.company.id)
            .then((response) => {
                this.billingUsers = response;
            });
    }

    displayFn(value: any): string {
        return value && typeof value === 'object' ? value.value : value;
    }

    filterUsers(val: string) {
        return val ? this.ddUsersList.filter((s) => new RegExp(val, 'gi').test(s.value)) : this.ddUsersList;
    }

    saveUser(){
        this.msUserClientService.updatePbr(this.company.id, this.currentPBRUser.key).then(() => {
            this.isEditMode = false;
            this.currentPBRUser = this.currentPBRUser.value;

            this.isBillingUser = (this.AuthService.authUser.id == this.currentPBRUser.key);
        })
    }

    saveExtraBillingReceivers() {
        this.msUserClientService.updateExtraBillingReceivers(this.company.id, this.extraBillingReceivers)
            .then(() => {
                this.snackBar.open('Saved', 'Close', {
                    duration: 2000,
                    extraClasses: ['alert-success']
                });
            })
    }

    cancel() {
        this.isEditMode = false;
    }

    showEditPBR() {
        this.isEditMode = !this.isEditMode;
    }

    getSettings() {
        return this.msUserClientService.getCompany(this.AuthService.company.id)
            .then(company => {
                this.company = company;
                if (company.pbr) {
                    this.pbrId = company.pbr.id;
                    this.currentPBRUser = company.pbr.first_name+' '+company.pbr.last_name+' ('+company.pbr.email+')';
                    this.extraBillingReceivers = company.extraBillingReceivers || '';
                }

                if (company) {
                    this.msUserClientService.getCompanyUsers(company.id).then(usersList => {
                        this.usersList = usersList;

                        usersList.forEach(user => {
                            this.ddUsersList.push({
                                key:  user.id,
                                value: user.first_name+' '+user.last_name+' ('+user.email+')'
                            });
                        });
                    });
                }
            });
    }

    addExtraBillingUser() {

        this.msLicenseClientService.addExtraBillingUser(this.company.id, this.userCtrl.value.key)
            .then(response => {
                this.loadBillingUsers();
                this.snackBar.open('Saved', 'Close', {
                    duration: 2000,
                    extraClasses: ['alert-success']
                });
            });
    }

    revokeBillingUser(billing_user) {

        this.msLicenseClientService.deleteExtraBillingUser(this.company.id, billing_user.id)
            .then(response => {
                this.loadBillingUsers();

                this.snackBar.open('Done', 'Close', {
                    duration: 2000,
                    extraClasses: ['alert-success']
                });
            });
    }

    setPrimaryBillingUser(billing_user) {

        this.msLicenseClientService.updatePrimaryContact(this.company.id, billing_user.id)
            .then(() => {
                this.msUserClientService.updatePbr(this.company.id, billing_user.id).then(() => {

                    this.snackBar.open('Saved', 'Close', {
                        duration: 2000,
                        extraClasses: ['alert-success']
                    });
                    this.isBillingUser = (this.AuthService.authUser.id == billing_user.id);
                });
            });
    }
}

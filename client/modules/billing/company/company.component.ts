import { Component, ViewChild } from "@angular/core";
import { AuthService } from "client/service/auth.service";
import {User} from "../../../entities/entities";
import {MsUserClientService} from "client/service/microservices/ms-user-client.service";

@Component({
    selector: 'company',
    templateUrl: 'client/modules/billing/company/company.component.html',
    styleUrls: ['client/modules/billing/company/company.component.css'],
})
export class CompanyComponent {


    currentPBRUser: string  = null;
    pbrId                   = null;
    company                 = null;
    usersList               = [];

    ddUsersList             = [];

    private isBillingUser: boolean = false;
    isEditMode: boolean     = false;


    me:             User    = null;

    constructor(protected MsUserClientService:    MsUserClientService,
                protected AuthService:            AuthService,) {
    }

    ngOnInit(): void {
        this.getSettings()
            .then(() => {
                this.isBillingUser = (this.AuthService.authUser.id == this.pbrId);
            });
    }

    saveUser(){
        this.MsUserClientService.updatePbr(this.company.id, this.pbrId).then(() => {
            this.isEditMode = false;
            let selectedUser  = this.usersList.filter((item) => {
                if (item.id == this.pbrId)
                    return item;
            }).shift();

            this.currentPBRUser = selectedUser.first_name+' '+selectedUser.last_name+' ('+selectedUser.email+')';
        })
    }

    cancel() {
        this.isEditMode = false;
    }

    showEditPBR() {
        this.isEditMode = !this.isEditMode;
    }

    getSettings() {
        return this.MsUserClientService.getCompany(this.AuthService.company.id)
            .then(company => {
                this.company     = company;
                if (company.pbr) {
                    this.pbrId       = company.pbr.id;
                    this.currentPBRUser = company.pbr.first_name+' '+company.pbr.last_name+' ('+company.pbr.email+')';
                }

                if (company) {
                    this.MsUserClientService.getCompanyUsers(company.id).then(usersList => {
                        this.usersList = usersList;

                        usersList.forEach(user => {

                            console.log(user.first_name);

                            this.ddUsersList.push({
                                key:  user.id,
                                value: user.first_name+' '+user.last_name+' ('+user.email+')'
                            });
                        })
                    });
                }
            });
    }
}

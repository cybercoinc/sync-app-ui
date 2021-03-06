import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../../service/auth.service";
import {User} from "../../../entities/entities";
import {MsUserClientService} from "../../../service/microservices/ms-user-client.service";
import {MsProjectClientService} from "../../../service/microservices/ms-project-client.service";

@Component({
    selector: 'company',
    templateUrl: 'client/modules/settings/company/company.component.html',
    styleUrls: ['client/modules/settings/company/company.component.css']
})
export class CompanyComponent implements OnInit {
    me:             User    = null;
    company                 = null;
    showDropDown            = false;
    pbrId                   = null;
    usersList               = [];
    ddUsersList             = [];
    currentUser:    any     = null;
    private isBillingUser: boolean = false;

    constructor(protected MsUserClientService:    MsUserClientService,
                protected AuthService:            AuthService,
                protected MsProjectClientService: MsProjectClientService
    ) {}

    ngOnInit(): void {
        this.getSettings()
            .then(() => {
                this.isBillingUser = this.AuthService.authUser.id == this.pbrId;
            });
    }

    saveUser(){
        this.MsUserClientService.updatePbr(this.company.id, this.pbrId).then(() => {
            this.showDropDown = false;
            let selectedUser  = this.usersList.filter((item) => {
                if (item.id == this.pbrId)
                    return item;
            }).shift();

            this.currentUser = selectedUser.first_name+' '+selectedUser.last_name+' ('+selectedUser.email+')';
        })
    }

    cancel() {
        this.showDropDown = false;
    }

    showEditPBR() {
        this.showDropDown = !this.showDropDown;
    }

    getSettings() {
        return this.MsUserClientService.getCompany(this.AuthService.company.id)
            .then(company => {
                this.company     = company;
                if (company.pbr) {
                    this.pbrId       = company.pbr.id;
                    this.currentUser = company.pbr.first_name+' '+company.pbr.last_name+' ('+company.pbr.email+')';
                }

                if (company) {
                    this.MsUserClientService.getCompanyUsers(company.id).then(usersList => {
                        this.usersList = usersList;

                        usersList.forEach(user => {
                            this.ddUsersList.push({
                                name:  user.id,
                                value: user.first_name+' '+user.last_name+' ('+user.email+')'
                            });
                        })
                    });
                }
            });
    }
}
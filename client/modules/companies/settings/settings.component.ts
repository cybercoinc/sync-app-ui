import {Component, OnInit} from "@angular/core";
import {MsUserClientService} from '../../../service/microservices/ms-user-client.service';
import {MsProjectClientService} from '../../../service/microservices/ms-project-client.service';
import {AuthService} from '../../../service/auth.service';
import {User} from '../../../entities/entities';

@Component({
    selector: "companies",
    templateUrl: 'client/modules/companies/settings/settings.component.html',
    styleUrls: ['client/modules/companies/settings/settings.component.css'],
})
export class CompanySettingsComponent implements OnInit {
    me:             User    = null;
    company                 = null;
    showDropDown            = false;
    pbrId                   = null;
    usersList               = [];
    ddUsersList             = [];
    currentUser:    any     = null;

    constructor(protected MsUserClientService:    MsUserClientService,
                protected AuthService:            AuthService,
                protected MsProjectClientService: MsProjectClientService
    ) {}

    ngOnInit(): void {
        this.getSettings(this.AuthService.authUser.id);
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

    getSettings(userId) {
        this.MsUserClientService.getCompany(userId)
            .then(company => {
                this.company     = company;
                this.pbrId       = company.pbr.id;
                this.currentUser = company.pbr.first_name+' '+company.pbr.last_name+' ('+company.pbr.email+')';

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

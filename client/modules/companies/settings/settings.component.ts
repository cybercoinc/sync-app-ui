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
    me: User = null;
    company = null;
    usersList = [];
    ddUsersList = [];
    showPbrDropDown = false;
    pbrId = null;
    isPbrIdChanged : boolean= false;

    constructor(protected MsUserClientService: MsUserClientService, protected AuthService: AuthService, protected MsProjectClientService: MsProjectClientService) {

    }
    savePbr(){

        this.MsUserClientService.updatePbr(this.company.id, this.pbrId).then(() => {
            this.isPbrIdChanged = false;
            this.showPbrDropDown = false;
        })

    }
    changePbrVal(val){
        this.pbrId = val;
        this.isPbrIdChanged = true;
    }
    ngOnInit(): void {
        this.getSettings(this.AuthService.authUser.id);
    }

    showEditPBR() {
        this.showPbrDropDown = !this.showPbrDropDown;
    }

    getSettings(userId) {

        this.MsUserClientService.getCompany(userId)
            .then(company => {
                this.company = company;
                this.pbrId = company.pbrId;
                if (company) {
                    this.MsUserClientService.getCompanyUsers(company.id).then(usersList => {
                        this.usersList = usersList;
                        usersList.forEach(user => {
                            this.ddUsersList.push({
                                id:user.id,
                                value:user.first_name+' '+user.last_name+'('+user.email+')'
                            });
                        })
                    });
                }
            });
    }

}

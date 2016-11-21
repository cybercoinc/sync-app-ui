import {Component, OnInit} from "@angular/core";
import {MsUserClientService} from '../../../service/microservices/ms-user-client.service';
import {MsProjectClientService} from '../../../service/microservices/ms-project-client.service';
import {AuthService} from '../../../service/auth.service';
import {User} from '../../../entities/entities';


@Component({
    selector: "companies",
    templateUrl: 'client/modules/companies/settings/settings.component.html',
    styleUrls: ['client/modules/companies/settings/settings.component.css']
})
export class CompanySettingsComponent implements OnInit {
    me: User = null;
    company = null;
    pbr = null;

    constructor(protected MsUserClientService: MsUserClientService, protected AuthService: AuthService, protected MsProjectClientService: MsProjectClientService) {

    }

    ngOnInit(): void {
        this.getCompanyWithPbrUser(this.AuthService.authUser.id,  this.AuthService.authUser.auth_session_id);

    }

    getUsers() {

    }
    getCompanyWithPbrUser(userId, authSessionId) {

         this.MsUserClientService.getCompany(userId, authSessionId) .then(company => {
             this.company = company
        });


    }

    getSettings(){

    }


}

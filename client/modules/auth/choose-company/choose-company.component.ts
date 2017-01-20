import {Component, OnInit, Inject} from "@angular/core";
import {MsUserClientService} from "client/service/microservices/ms-user-client.service";
import {AuthService} from "client/service/auth.service";

@Component({
    selector: "choose-company",
    templateUrl: `client/modules/auth/choose-company/choose-company.component.html`
})
export class ChooseCompanyComponent implements OnInit{
    constructor(protected MsUserClientService: MsUserClientService, protected AuthService: AuthService) {
    }

    public companiesList = [{}];

    ngOnInit() {
        this.MsUserClientService.getCompaniesList(this.AuthService.authUser.id)
            .then(companiesList => this.companiesList = companiesList);
    }

    getCompany(companyId) {
        this.MsUserClientService.getAuthWithCompany(companyId, this.AuthService.authUser.id)
            .then(() => {
                window.location.replace('/')
            })
            .catch(err => {
                console.warn(err)
            });
    }

}

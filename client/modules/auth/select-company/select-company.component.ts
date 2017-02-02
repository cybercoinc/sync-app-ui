import {Component, OnInit, Inject} from "@angular/core";
import {MsUserClientService} from "client/service/microservices/ms-user-client.service";
import {AuthService} from "client/service/auth.service";

@Component({
    selector: "select-company",
    templateUrl: `client/modules/auth/select-company/select-company.component.html`
})
export class SelectCompanyComponent implements OnInit{
    constructor(protected MsUserClientService: MsUserClientService, protected AuthService: AuthService) {
    }

    public companiesList = [{}];

    ngOnInit() {
        this.MsUserClientService.getCompaniesList()
            .then(companiesList => this.companiesList = companiesList);
    }

    authWithProcoreCompany(procoreCompanyId) {
        this.MsUserClientService.getAuthWithProcoreCompany(procoreCompanyId, this.AuthService.authUser.id)
            .then(() => {
                window.location.replace('/')
            })
            .catch(err => {
                console.warn(err)
            });
    }

}

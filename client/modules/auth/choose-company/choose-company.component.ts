import {Component, OnInit} from "@angular/core";
import {MsUserClientService} from "client/service/microservices/ms-user-client.service";

@Component({
    selector: "choose-company",
    templateUrl: `client/modules/auth/choose-company/choose-company.component.html`
})
export class ChooseCompanyComponent implements OnInit{
    constructor(protected MsUserClientService: MsUserClientService) {
    }

    public companiesList = [{}];

    ngOnInit() {
        this.MsUserClientService.getCompaniesList()
            .then(companiesList => this.companiesList = companiesList);
    }

    authWithProcoreCompany(procoreCompanyId) {
        this.MsUserClientService.getAuthWithProcoreCompany(procoreCompanyId)
            .then(() => {
                window.location.replace('/')
            })
            .catch(err => {
                console.warn(err)
            });
    }

}

import {Component} from "@angular/core";
import {AuthService} from '../../../service/auth.service';
import {MsLicenseClientService} from '../../../service/microservices/ms-license-client.service';
import {MsProjectClientService} from '../../../service/microservices/ms-project-client.service';
import {Project} from "client/entities/entities";

@Component({
    selector: "billing",
    templateUrl: 'client/modules/billing/licenses/licenses.component.html',
    styleUrls: ['client/modules/billing/licenses/licenses.component.css'],
})
export class LicensesComponent {
    protected activeProjects: Project[];
    protected deletedProjects: Project[];

    constructor(protected AuthService: AuthService, protected MsLicenseClientService: MsLicenseClientService, protected MsProjectClientService: MsProjectClientService) {
        this.MsLicenseClientService.getLicenses(AuthService.authUser.id, AuthService.company.id)
            .then(projects => {
                this.activeProjects  = projects.activeProjects;
                this.deletedProjects = projects.deletedProjects;
            });
    }
}

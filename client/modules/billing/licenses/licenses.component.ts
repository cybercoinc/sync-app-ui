import {Component} from "@angular/core";
import {AuthService} from '../../../service/auth.service';
import {MsLicenseClientService} from '../../../service/microservices/ms-license-client.service';
import {MsProjectClientService} from '../../../service/microservices/ms-project-client.service';

@Component({
    selector: "billing",
    templateUrl: 'client/modules/billing/licenses/licenses.component.html',
    styleUrls: ['client/modules/billing/licenses/licenses.component.css'],
})
export class LicensesComponent {
    licenses = [];

    constructor(protected AuthService: AuthService, protected MsLicenseClientService: MsLicenseClientService, protected MsProjectClientService: MsProjectClientService) {
        this.MsLicenseClientService.getLicenses(AuthService.authUser.id)
            .then(licenses => {
                this.licenses = licenses;
            });
    }
}

import {Component, OnInit} from "@angular/core";
import {MsUserClientService} from '../../../service/microservices/ms-user-client.service';
import {AuthService} from '../../../service/auth.service';
import {MsLicenseClientService} from '../../../service/microservices/ms-license-client.service';
import {User} from '../../../entities/entities';

@Component({
    selector: "billing",
    templateUrl: 'client/modules/billing/licenses/licenses.component.html',
    styleUrls: ['client/modules/billing/licenses/licenses.component.css']
})
export class LicensesComponent implements OnInit {
    me: User = null;
    licensesList = [];

    constructor(protected MsUserClientService: MsUserClientService, protected AuthService: AuthService, protected MsLicenseClientService: MsLicenseClientService) {

    }

    ngOnInit(): void {
        this.getActiveLicenses();
    }

    getActiveLicenses() {
        this.MsLicenseClientService.getLicenses(this.AuthService.authUser.id, this.AuthService.authUser.auth_session_id)
            .then(licensesList => {
                console.log('licensesList>>>',licensesList)
                this.licensesList = licensesList;
            });
    }



}

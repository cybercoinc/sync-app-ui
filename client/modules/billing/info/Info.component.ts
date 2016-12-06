import { Component } from "@angular/core";
import { AuthService } from "../../../service/auth.service";
import { MsLicenseClientService } from '../../../service/microservices/ms-license-client.service';

@Component({
    selector: 'info',
    template: '<pay-trace></pay-trace>'
})
export class InfoComponent {
    constructor(protected AuthService: AuthService, protected MsLicenseClientService: MsLicenseClientService) {}
}

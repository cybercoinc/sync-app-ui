import {Component, OnInit} from "@angular/core";
import {MsUserClientService} from '../../../service/microservices/ms-user-client.service';
import {AuthService} from '../../../service/auth.service';
import {MsLicenseClientService} from '../../../service/microservices/ms-license-client.service';
import {MsProjectClientService} from '../../../service/microservices/ms-project-client.service';
import {User} from '../../../entities/entities';

@Component({
    selector: "billing",
    templateUrl: 'client/modules/billing/licenses/licenses.component.html',
    styleUrls: ['client/modules/billing/licenses/licenses.component.css']
})
export class LicensesComponent implements OnInit {
    me: User = null;
    licensesList = [];

    constructor(protected MsUserClientService: MsUserClientService, protected AuthService: AuthService, protected MsLicenseClientService: MsLicenseClientService, protected MsProjectClientService: MsProjectClientService) {

    }

    ngOnInit(): void {
        this.getActiveLicenses();
    }

    getActiveLicenses() {
        this.MsLicenseClientService.getLicenses(this.AuthService.authUser.id, this.AuthService.authTokenId)
            .then(licensesList => {
                this.licensesList = licensesList;
                var projects = [];
                licensesList.forEach(license => {
                    projects.push( this.MsProjectClientService.getProjectByid(license.entity_id, this.AuthService.authTokenId));
                });

                return Promise.all(projects);

            }).then(projectsList => {


            var ll = this.licensesList.map(license => {

                // var license_project = projectsList.filter(project => {
                //     console.log('>>>>> filter project[0].id', project[0].id);
                //
                //     if (project[0].id == license.entity_id) {
                //         return true;
                //     }
                //
                //     return false;
                // });
                //
                // console.log('>>>>>', license_project);
                // license_project = license_project[0][0];
                // console.log('>>>>>', license_project);
                //
                // if (license_project && license_project['id']) {
                //     var id = license_project['id'];
                //     var name = license_project['name'];
                //
                //     license.link_to_project = '<a href="#/projects/' + id + '/edit-project">' + name + '</a>';
                // }

            });
            this.licensesList = ll;
        });
    }



}

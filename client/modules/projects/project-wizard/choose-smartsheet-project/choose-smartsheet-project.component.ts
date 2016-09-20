import {Component, OnInit, Input} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {AuthService} from 'client/service/auth.service';

@Component({
    selector: "choose-smartsheet-project",
    templateUrl: `client/modules/projects/project-wizard/choose-smartsheet-project/choose-smartsheet-project.component.html`,
    styles: [`
            .projects-list {
                height: 250px;
                width: 500px;
                overflow-x: auto;
                padding-top: 20px;
            }

            md-radio-button {
                margin-left: 20px;
            }
        `]
})
export class ChooseSmartsheetProjectComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService, protected AuthService: AuthService) {
    }

    ngOnInit() {
        // todo find a way to prevent recreating of component. mb CanReuse interface will be implemented later.
        if (!this.smartsheetProjects) {
            this.getSmartsheetProjects()
                .then(smartsheetProjects => this.smartsheetProjects = smartsheetProjects);
        }
    }

    @Input() step: {result: {}|null};

    smartsheetProjects: [{}]|null = null;
    filterTimeout;

    filterProjects(name: string) {
        if (this.filterTimeout) {
            window.clearTimeout(this.filterTimeout);
        }

        const _self = this;
        this.step.result = null;

        _self.filterTimeout = setTimeout(function () {
            _self.smartsheetProjects = null;

            _self.getSmartsheetProjects()
                .then(function (smartsheetProjectsList) {
                    _self.smartsheetProjects = smartsheetProjectsList.filter(function (project) {
                        return project['name'].toLowerCase().indexOf(name.toLowerCase()) !== -1;
                    });

                    return _self.smartsheetProjects;
                });
        }, 500);
    }

    getSmartsheetProjects() {
        return this.MsProjectClientService
            .getSmartsheetProjects(this.AuthService.authUser.id, this.AuthService.authUser.auth_session_id);
    }

    chooseProject(project) {
        this.step.result = project;
    }
}

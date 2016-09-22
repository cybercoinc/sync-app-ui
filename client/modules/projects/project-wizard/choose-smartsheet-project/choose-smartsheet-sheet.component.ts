import {Component, OnInit, Input} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {AuthService} from 'client/service/auth.service';

@Component({
    selector: "choose-smartsheet-sheet",
    templateUrl: `client/modules/projects/project-wizard/choose-smartsheet-project/choose-smartsheet-sheet.component.html`,
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
export class ChooseSmartsheetSheetComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService, protected AuthService: AuthService) {
    }

    ngOnInit() {
        // todo find a way to prevent recreating of component. mb CanReuse interface will be implemented later.
        if (!this.smartsheetSheets) {
            this.getSmartsheetSheets()
                .then(smartsheetSheets => this.smartsheetSheets = smartsheetSheets);
        }
    }

    @Input() step: {result: {}|null};
    @Input() steps: {CHOOSE_PROCORE_PROJECT: {result: {name: string}}};

    smartsheetSheets: [{}]|null = null;
    filterTimeout;

    filterProjects(name: string) {
        if (this.filterTimeout) {
            window.clearTimeout(this.filterTimeout);
        }

        const _self = this;
        this.step.result = null;

        _self.filterTimeout = setTimeout(function () {
            _self.smartsheetSheets = null;

            _self.getSmartsheetSheets()
                .then(function (smartsheetProjectsList) {
                    _self.smartsheetSheets = smartsheetProjectsList.filter(function (project) {
                        return project['name'].toLowerCase().indexOf(name.toLowerCase()) !== -1;
                    });

                    return _self.smartsheetSheets;
                });
        }, 500);
    }

    getSmartsheetSheets() {
        return this.MsProjectClientService
            .getSmartsheetProjects(this.AuthService.authUser.id, this.AuthService.authUser.auth_session_id);
    }

    chooseExistingSheet(project) {
        this.step.result = project;

        console.log('steps', this.steps);
    }

    createNewSheetWithWorkspace() {
        let procoreProjectName = this.steps.CHOOSE_PROCORE_PROJECT.result.name;
        let workspaceName = procoreProjectName.length > 30? procoreProjectName.slice(0, 30) : procoreProjectName;
        let newSheetName = workspaceName + ' Procore Sync';
    }
}
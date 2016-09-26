import {Component, OnInit, Input} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {AuthService} from 'client/service/auth.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Config} from 'client/config';

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
    constructor(protected MsProjectClientService: MsProjectClientService,
                protected AuthService: AuthService,
                private route: ActivatedRoute,
                private router: Router) {

        this.project = null;
        this.smartsheetSheets = null;
        this.selectedSheet = null;
    }

    ngOnInit() {
        this.getSmartsheetSheets()
            .then(smartsheetSheets => this.smartsheetSheets = smartsheetSheets);

        this.route.params.forEach((params: Params) => {
            let id = +params['id'];

            this.MsProjectClientService.getProjectByid(id, this.AuthService.authUser.auth_session_id)
                .then(projects => this.project = projects.shift());
        });
    }

    project: {name: string, id: number} | null;

    smartsheetSheets: [{}]|null;

    selectedSheet: {
        accessLevel: string,
        id: number,
        name: string,
        permalink: string
    }|null;

    filterTimeout;

    filterProjects(name: string) {
        if (this.filterTimeout) {
            window.clearTimeout(this.filterTimeout);
        }

        const _self = this;

        _self.filterTimeout = setTimeout(function () {
            _self.smartsheetSheets = null;
            _self.selectedSheet = null;

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

    chooseExistingSheet(sheet) {
        this.selectedSheet = sheet;
    }

    createNewSheetWithWorkspace() {
        let procoreProjectName = this.project.name;
        let workspaceName = procoreProjectName.length > 30 ? procoreProjectName.slice(0, 30) : procoreProjectName;
        let newSheetName = workspaceName + ' Procore Sync';

        return this.MsProjectClientService.createSmartsheetWorkspace({
            workspaceName: workspaceName,
            projectId: this.project.id
        }, this.AuthService.authUser.auth_session_id)
            .then(result => {
                // creating workspace
                const workspaceId = result.id;

                return this.MsProjectClientService.createSmartsheetSheetFromTemplate({
                    workspaceId: workspaceId,
                    projectId: this.project.id,
                    templateId: Config.getEnvironmentVariable('SM_PROJECT_TEMPLATE_ID'),
                    sheetName: newSheetName
                }, this.AuthService.authUser.auth_session_id);
            })
            .then(result => {
                // creating sheet inside workspace
                this.selectedSheet = result;

                return this.MsProjectClientService
                    .update(this.project.id, {
                        sm_sheet_id: this.selectedSheet.id,
                        permalink: this.selectedSheet.permalink
                    }, this.AuthService.authUser.auth_session_id);
            })
            .then(projectId => {
                // matching columns
                return this.MsProjectClientService
                    .matchDefaultSheetColumns({
                        projectId: this.project.id
                    }, this.AuthService.authUser.auth_session_id);
            })
            .then(response => {
                console.log('response', response);
            })
    }

    goToNextStep() {
        // this.MsProjectClientService
        //     .update(this.project.id, {
        //         sm_sheet_id: this.selectedSheet.id,
        //         permalink: this.selectedSheet.permalink
        //     }, this.AuthService.authUser.auth_session_id)
        //     .then(result => {
        //         return this.router.navigate(['projects/wizard/choose-smartsheet-sheet', this.project.id]);
        //     })
    }
}

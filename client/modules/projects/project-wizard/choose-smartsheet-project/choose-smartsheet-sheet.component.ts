import {Component, OnInit, Input} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {AuthService} from 'client/service/auth.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Config} from 'client/config';

@Component({
    selector: "choose-smartsheet-sheet",
    templateUrl: `client/modules/projects/project-wizard/choose-smartsheet-project/choose-smartsheet-sheet.component.html`,
    styleUrls: ['client/modules/projects/project-wizard/choose-smartsheet-project/choose-smartsheet-sheet.component.css'],
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

    smartsheetSheets: [{
        is_connected: boolean
    }]|null;

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

        this.filterTimeout = setTimeout(e => {
            this.smartsheetSheets = null;
            this.selectedSheet = null;

            this.getSmartsheetSheets()
                .then(smartsheetSheetsList => {
                    this.smartsheetSheets = smartsheetSheetsList.filter(sheet => {
                        return sheet['name'].toLowerCase().indexOf(name.toLowerCase()) !== -1;
                    });

                    return this.smartsheetSheets;
                })
        }, 500);
    }

    getSmartsheetSheets() {
        return this.MsProjectClientService
            .getSmartsheetProjects(this.AuthService.authUser.id, this.AuthService.authUser.auth_session_id);
    }

    chooseExistingSheet(sheet) {
        if (sheet.is_connected) {
            return false;
        }

        this.selectedSheet = sheet;

        return this.MsProjectClientService
            .update(this.project.id, {
                sm_sheet_id: this.selectedSheet.id,
                permalink: this.selectedSheet.permalink
            }, this.AuthService.authUser.auth_session_id)
            .then(projectId => {
                this.goToNextStep();
            });
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
            .then(createdSheetObj => {
                // creating sheet inside workspace
                this.selectedSheet = createdSheetObj;

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
                        projectId: projectId
                    }, this.AuthService.authUser.auth_session_id);
            })
            .then(projectId => {
                return this.router.navigate(['projects/wizard/set-working-week-days', projectId]);
            })
    }

    goToNextStep() {
        return this.router.navigate(['projects/wizard/match-sheet-columns', this.project.id]);
    }
}

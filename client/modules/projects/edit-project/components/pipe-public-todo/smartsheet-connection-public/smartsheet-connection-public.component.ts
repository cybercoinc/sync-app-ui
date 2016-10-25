import {Component, OnInit, Input} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {AuthService} from 'client/service/auth.service';
import {PipeConnectionService} from 'client/service/pipe-connection.service';

import {Router, ActivatedRoute, Params} from '@angular/router';
import {Config} from 'client/config';
import {Project, SmartsheetSheet} from 'client/entities/entities';

@Component({
    selector: "smartsheet-connection-public",
    templateUrl: 'client/modules/projects/edit-project/components/pipe-public-todo/smartsheet-connection-public/smartsheet-connection-public.component.html',
    styleUrls: ['client/modules/projects/edit-project/components/pipe-public-todo/smartsheet-connection-public/smartsheet-connection-public.component.css'],
})
export class SmartsheetConnectionPublicComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService,
                protected AuthService: AuthService,
                protected PipeConnectionService: PipeConnectionService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        let project = this.PipeConnectionService.project;

        this.MsProjectClientService.getConnectedSmartsheetSheetsIds(project.id, this.AuthService.authUser.auth_session_id)
            .then(connectedSmSheetsList => {
                this.connectedSmSheetsIdsList = connectedSmSheetsList;

                return this.getSmartsheetSheets();
            })
            .then(smartsheetSheets => {
                this.smartsheetSheets = smartsheetSheets;
            });
    }

    public smartsheetSheets: SmartsheetSheet[]|null = null;
    public connectedSmSheetsIdsList: [number] | null = null;
    public selectedSheet: SmartsheetSheet|null = null;

    protected filterTimeout;

    filterProjects(inputName: string) {
        if (this.filterTimeout) {
            window.clearTimeout(this.filterTimeout);
        }

        this.filterTimeout = setTimeout(e => {
            this.smartsheetSheets = null;
            this.selectedSheet = null;

            this.getSmartsheetSheets()
                .then(smartsheetSheetsList => {
                    this.smartsheetSheets = smartsheetSheetsList.filter(sheet => {
                        return sheet['name'].toLowerCase().indexOf(inputName.toLowerCase()) !== -1;
                    });

                    return this.smartsheetSheets;
                })
        }, 500);
    }

    getSmartsheetSheets() {
        return this.MsProjectClientService
            .getSmartsheetSheets(this.AuthService.authUser.id, this.AuthService.authUser.auth_session_id);
    }

    chooseExistingSheet(sheet) {
        if (this.checkIfAlreadyConnected(sheet)) {
            return false;
        }

        this.selectedSheet = sheet;
    }

    checkIfAlreadyConnected(smSheet: SmartsheetSheet): boolean {
        return this.connectedSmSheetsIdsList.indexOf(smSheet.id) !== -1;
    }

    createNewSheetWithWorkspace() {
        let project = this.PipeConnectionService.project;

        let procoreProjectName = project.name;
        let workspaceName = procoreProjectName.length > 30 ? procoreProjectName.slice(0, 30) : procoreProjectName;
        let newSheetName = workspaceName + ' Procore Sync';

        let createdPipeId;

        return this.MsProjectClientService.createPipe(project.id, 'public_todos', 'active', this.AuthService.authUser.auth_session_id)
            .then(pipesIds => {
                createdPipeId = pipesIds.shift();

                return this.MsProjectClientService.createSmartsheetWorkspace({
                    workspaceName: workspaceName,
                    projectId: project.id // todo pass user id here?
                }, this.AuthService.authUser.auth_session_id)
            })
            .then(result => {
                // creating workspace
                const workspaceId = result.id;

                return this.MsProjectClientService.createSmartsheetSheetFromTemplate({
                    workspaceId: workspaceId,
                    projectId: project.id,
                    templateId: Config.getEnvironmentVariable('SM_PROJECT_TEMPLATE_ID'),
                    sheetName: newSheetName
                }, this.AuthService.authUser.auth_session_id);
            })
            .then(createdSheetObj => {

                // todo update pipe here, not project
                return this.MsProjectClientService.update(project.id, {
                    sm_sheet_id: createdSheetObj.id,
                    permalink: createdSheetObj.permalink
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
                return this.router.navigate(['edit-project/pipe-public-todo/settings-public', projectId]);
            });
    }

    goToNextStep() {

        // this.MsProjectClientService
        //     .update(this.project.id, {
        //         sm_sheet_id: this.selectedSheet.id,
        //         permalink: this.selectedSheet.permalink
        //     }, this.AuthService.authUser.auth_session_id)
        //     .then(projectId => {
        //         return this.router.navigate(['projects/wizard/match-sheet-columns', projectId]);
        //     });

    }
}

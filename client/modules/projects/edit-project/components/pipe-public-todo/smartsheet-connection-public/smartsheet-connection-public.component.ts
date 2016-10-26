import {Component, OnInit, Input} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {AuthService} from 'client/service/auth.service';
import {PipeConnectionService} from 'client/service/pipe-connection.service';

import {Router, ActivatedRoute, Params} from '@angular/router';
import {Config} from 'client/config';
import {Project, SmartsheetSheet} from 'client/entities/entities';
import {PIPE_TYPE_PUBLIC_TODOS, PIPE_STATUS_DISABLED} from 'client/entities/entities';

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

        // create new pipe
        return this.MsProjectClientService.createPipe(project.id, {
            type: PIPE_TYPE_PUBLIC_TODOS,
            status: PIPE_STATUS_DISABLED
        }, this.AuthService.authUser.auth_session_id)
            .then(pipesIds => {
                createdPipeId = pipesIds.shift();

                // create new workspace at smartsheet
                return this.MsProjectClientService
                    .createSmartsheetWorkspace(project.id, workspaceName, this.AuthService.authUser.auth_session_id)
            })
            .then(workspace => {
                // create new sheet inside workspace
                return this.MsProjectClientService.createSmartsheetSheetFromTemplate(
                    project.id, workspace.id, Config.getEnvironmentVariable('SM_PROJECT_TEMPLATE_ID'), newSheetName, this.AuthService.authUser.auth_session_id
                );
            })
            .then(createdSheetObj => {
                // updating pipe
                return this.MsProjectClientService.updatePipe(createdPipeId, {
                    sm_sheet_id: createdSheetObj.id,
                    sm_permalink: createdSheetObj.permalink
                }, this.AuthService.authUser.auth_session_id);
            })
            .then(pipeId => {
                // matching columns
                return this.MsProjectClientService.matchDefaultSheetColumns(project.id, createdPipeId, this.AuthService.authUser.auth_session_id);
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

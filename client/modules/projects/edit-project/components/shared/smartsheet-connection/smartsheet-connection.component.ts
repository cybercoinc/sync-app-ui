import {Component, OnInit, Input} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {AuthService} from 'client/service/auth.service';
import {PipeConnectionService} from 'client/service/pipe-connection.service';

import {Router, ActivatedRoute} from '@angular/router';
import {Config} from 'client/config';
import {SmartsheetSheet} from 'client/entities/entities';
import {PendingRequestsService} from "client/service/pending-requests.service";

@Component({
    selector: 'smartsheet-connection',
    templateUrl: 'client/modules/projects/edit-project/components/shared/smartsheet-connection/smartsheet-connection.component.html',
    styleUrls: ['client/modules/projects/edit-project/components/shared/smartsheet-connection/smartsheet-connection.component.css'],
})
export class SmartsheetConnectionComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService,
                protected AuthService: AuthService,
                protected PipeConnectionService: PipeConnectionService,
                protected PendingRequestsService: PendingRequestsService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    @Input('pipe-type') pipeType: 'public_todos' | 'private_todos' | 'tasks';
    @Input('redirect-route') redirectRoute;

    ngOnInit() {
        this.pipesListObj = this.PipeConnectionService.pipesListObj;

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

    protected pipesListObj;

    protected filterTimeout;

    protected columnsMatchingIsVisible: boolean = false;

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

    createNewSheetWithWorkspace(): boolean | Promise<boolean> {
        if (this.PendingRequestsService.hasPendingRequest) {
            return false;
        }

        let project = this.PipeConnectionService.project;

        let procoreProjectName = project.name;
        let workspaceName = procoreProjectName.length > 20 ? procoreProjectName.slice(0, 20) + '...' : procoreProjectName;
        let newSheetName = workspaceName + ' ' + this.PipeConnectionService.getPipeLabelByType(this.pipeType) + ' Procore Sync';

        let _pipeId;

        return this.PipeConnectionService.createNewOrGetExistingPipe(this.pipeType)
            .then(pipeId => {
                _pipeId = pipeId;

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
                return this.MsProjectClientService.updatePipe(_pipeId, {
                    sm_sheet_id: createdSheetObj.id,
                    sm_permalink: createdSheetObj.permalink
                }, this.AuthService.authUser.auth_session_id);
            })
            .then(pipeId => {
                // matching columns
                return this.MsProjectClientService.matchDefaultSheetColumns(project.id, _pipeId, this.AuthService.authUser.auth_session_id);
            })
            .then(() => {
                return this.PipeConnectionService.refreshPipesList();
            })
            .then(() => {
                return this.router.navigate(this.redirectRoute);
            });
    }

    showColumnsMatching() {
        this.columnsMatchingIsVisible = true;
    }

    onColumnsMatched(columnsObj): boolean | Promise<boolean> {
        if (this.PendingRequestsService.hasPendingRequest) {
            return false;
        }

        let project = this.PipeConnectionService.project;

        let procoreProjectName = project.name;
        let workspaceName = procoreProjectName.length > 30 ? procoreProjectName.slice(0, 30) : procoreProjectName;

        let _pipeId;

        return this.PipeConnectionService.createNewOrGetExistingPipe(this.pipeType)
            .then(pipeId => {
                _pipeId = pipeId;

                // create new workspace at smartsheet
                return this.MsProjectClientService
                    .createSmartsheetWorkspace(project.id, workspaceName, this.AuthService.authUser.auth_session_id)
            })
            .then(workspace => {
                // move sheet to new workspace
                return this.MsProjectClientService.moveSheetToWorkspace(
                    project.id, this.selectedSheet.id, workspace.id, this.AuthService.authUser.auth_session_id
                );
            })
            .then(sheetId => {
                // updating pipe
                return this.MsProjectClientService.updatePipe(_pipeId, {
                    sm_sheet_id: sheetId.id,
                    sm_permalink: sheetId.permalink
                }, this.AuthService.authUser.auth_session_id);
            })
            .then(pipeId => {
                // matching columns
                return this.MsProjectClientService.saveMatchedColumns(_pipeId, columnsObj, this.AuthService.authUser.auth_session_id);
            })
            .then(() => {
                return this.PipeConnectionService.refreshPipesList();
            })
            .then(() => {
                return this.router.navigate(this.redirectRoute);
            });
    }
}

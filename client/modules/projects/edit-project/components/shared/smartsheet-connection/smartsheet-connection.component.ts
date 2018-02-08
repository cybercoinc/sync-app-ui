import { Component, OnInit, Input } from '@angular/core';
import { MsProjectClientService } from 'client/service/microservices/ms-project-client.service';
import { AuthService } from 'client/service/auth.service';
import { PipeConnectionService } from 'client/service/pipe-connection.service';

import { Router, ActivatedRoute } from '@angular/router';
import { SmartsheetSheet, PIPE_TYPE_TASKS } from 'client/entities/entities';
import { PendingRequestsService } from 'client/service/pending-requests.service';
import { ConfigService } from 'client/service/config.service';

@Component({
    selector: 'smartsheet-connection',
    templateUrl: 'client/modules/projects/edit-project/components/shared/smartsheet-connection/smartsheet-connection.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/shared/smartsheet-connection/smartsheet-connection.component.css',
        'client/modules/projects/edit-project/edit-project.component.css'
    ]
})
export class SmartsheetConnectionComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService,
                protected AuthService: AuthService,
                protected PipeConnectionService: PipeConnectionService,
                protected PendingRequestsService: PendingRequestsService,
                private route: ActivatedRoute,
                private ConfigService: ConfigService,
                private router: Router) {
    }

    @Input('pipe-type') pipeType: 'public_todos' | 'private_todos' | 'tasks';
    @Input('redirect-route') redirectRoute;

    private isShowAlert: boolean = false;
    private isShowSuccess: boolean = false;
    private todos = [];

    ngOnInit() {
        this.PipeConnectionService.refreshPipesList();

        let isPrivate = this.pipeType == 'private_todos';

        if (this.pipeType == 'public_todos' || this.pipeType == 'private_todos') {
            if ((isPrivate && !this.PipeConnectionService.pipesListObj['private_todos']) ||
                (!isPrivate && !this.PipeConnectionService.pipesListObj['public_todos'])) {
                this.MsProjectClientService.getTodos(this.AuthService.authUser.id, this.PipeConnectionService.project.id, isPrivate)
                    .then(todos => {
                        if (todos.length > 0) {
                            this.todos = todos;
                            this.isShowAlert = true;
                        }
                    });
            }

        }

        // if need to rematch columns
        this.needToRematchColumns = this.PipeConnectionService.pipesListObj[this.pipeType]
            && this.PipeConnectionService.pipesListObj[this.pipeType].need_to_match_sm_columns;
    }

    removeTodos(): void {
        let todos = [];

        this.todos.forEach(todo => {
            todos.push(todo.id);
        });

        this.MsProjectClientService.deleteTodos(this.AuthService.authUser.id, this.PipeConnectionService.project.id, todos)
            .then(result => {
                this.isShowAlert = false;
                this.isShowSuccess = true;
            });
    }

    hideAlert(): void {
        this.isShowAlert = false;
    }

    public smartsheetSheets: SmartsheetSheet[] | null = null;
    public connectedSmSheetsIdsList: [number] | null = null;
    public selectedSheet: SmartsheetSheet | null = null;

    protected filterTimeout;

    protected columnsMatchingIsVisible: boolean = false;
    protected needToRematchColumns: boolean = false;

    protected haveExistingSheet: boolean;

    setExistingSheetParam(doHave: boolean) {
        this.haveExistingSheet = doHave;
    }

    startChoosingExistingSheet() {
        this.setExistingSheetParam(true);

        return Promise.all([
            this.getSmartsheetSheets(),
            this.MsProjectClientService.getConnectedSmartsheetSheetsIds()
        ])
            .then(results => {
                this.smartsheetSheets = results[0];
                this.connectedSmSheetsIdsList = results[1];
            })
    }

    cancel() {
        this.haveExistingSheet = undefined;
        this.selectedSheet = null;
        this.columnsMatchingIsVisible = false;
    }

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
            .getSmartsheetSheets();
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

    /**
     * @todo workspace will not be used
     * @returns {any}
     */
    createNewSheetWithWorkspace(): any | boolean | Promise<boolean> {
        if (this.PendingRequestsService.hasPendingRequest) {
            return false;
        }

        this.setExistingSheetParam(false);

        let project = this.PipeConnectionService.project;

        let procoreProjectName = project.name;
        let workspaceName = procoreProjectName.length > 30 ? procoreProjectName.slice(0, 30) + '...' : procoreProjectName;
        let newSheetName = workspaceName + ' ' + this.PipeConnectionService.getPipeLabelByType(this.pipeType);

        let _pipeId;


        return this.MsProjectClientService.createSmartsheetSheetFromTemplateInSheetsFolder(
            project.id, this.ConfigService.getConfig('SM_PROJECT_TEMPLATE_ID'), newSheetName
        )
            .then(createdSheetObj => {
                return this.PipeConnectionService.createNewOrGetExistingPipe(
                    this.pipeType,
                    false, {
                        sm_sheet_id: createdSheetObj.id,
                        sm_permalink: createdSheetObj.permalink,
                        sm_sheet_name: createdSheetObj.name
                    })
            })
            .then(pipeId => {
                _pipeId = pipeId;

                if (this.pipeType === PIPE_TYPE_TASKS) {
                    return this.MsProjectClientService.addResourceColumnToSheet(_pipeId);
                }
            })
            .then(() => {
                return this.MsProjectClientService.matchDefaultSheetColumns(_pipeId);
            })
            .then(() => {
                return this.PipeConnectionService.refreshPipesList();
            });
    }

    showColumnsMatching() {
        this.columnsMatchingIsVisible = true;
    }

    onColumnsRematched(columnsObj) {
        this.needToRematchColumns = false;

        return this.PipeConnectionService.createNewOrGetExistingPipe(this.pipeType)
            .then(pipeId => {
                // matching columns
                return this.MsProjectClientService.saveMatchedColumns(pipeId, columnsObj);
            })
            .then(() => {
                return this.PipeConnectionService.refreshPipesList();
            })
    }

    onColumnsMatched(columnsObj): boolean | Promise<any> {
        if (this.PendingRequestsService.hasPendingRequest) {
            return false;
        }

        let _pipeId;

        return this.PipeConnectionService.createNewOrGetExistingPipe(
            this.pipeType,
            false,
            {
                sm_sheet_id: this.selectedSheet.id,
                sm_permalink: this.selectedSheet.permalink,
                sm_sheet_name: this.selectedSheet.name
            })
            .then(pipeId => {
                _pipeId = pipeId;

                return this.MsProjectClientService.saveMatchedColumns(_pipeId, columnsObj);
            })
            .then(() => {
                return this.PipeConnectionService.refreshPipesList();
            });
    }

    showColumnsRematch() {
        this.needToRematchColumns = true;
    }
}

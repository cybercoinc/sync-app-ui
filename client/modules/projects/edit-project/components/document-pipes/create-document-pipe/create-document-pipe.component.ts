import { Component, OnInit, Input } from '@angular/core';

import { PipeConnectionService } from 'client/service/pipe-connection.service';
import { SmartsheetSheet } from '../../../../../../entities/entities';
import { PendingRequestsService } from '../../../../../../service/pending-requests.service';
import { AuthService } from '../../../../../../service/auth.service';
import { MsProjectClientService } from '../../../../../../service/microservices/ms-project-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../../../../../service/config.service';
import { ProcoreFolder } from '../procore-folders-picker/procore-folders-picker.component';

@Component({
    selector: 'create-document-pipe',
    templateUrl: 'client/modules/projects/edit-project/components/document-pipes/create-document-pipe/create-document-pipe.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/document-pipes/create-document-pipe/create-document-pipe.component.css'
    ]
})
export class CreateDocumentPipeComponent implements OnInit {
    constructor(protected msProjectService: MsProjectClientService,
                protected AuthService: AuthService,
                protected pipesConnectionService: PipeConnectionService,
                protected PendingRequestsService: PendingRequestsService,
                private route: ActivatedRoute,
                private ConfigService: ConfigService,
                private router: Router) {
    }

    @Input('redirect-route') redirectRoute;

    ngOnInit() {
    }

    public smartsheetSheets: SmartsheetSheet[] | null = null;
    public connectedSmSheetsIdsList: [number] | null = null;
    public selectedSheet: SmartsheetSheet | null = null;

    protected pipesListObj;

    protected filterTimeout;

    protected columnsMatchingIsVisible: boolean = false;

    protected haveExistingSheet: boolean;

    protected procoreFoldersPickersVisible: boolean = false;

    showProcoreFoldersPicker() {
        this.procoreFoldersPickersVisible = true;
    }

    hideProcoreFoldersPicker() {
        this.procoreFoldersPickersVisible = false;
    }

    setExistingSheetParam(doHave: boolean) {
        this.haveExistingSheet = doHave;
    }

    startChoosingExistingSheet() {
        this.setExistingSheetParam(true);

        return Promise.all([
            this.getSmartsheetSheets(),
            this.msProjectService.getConnectedSmartsheetSheetsIds()
        ])
            .then(results => {
                this.smartsheetSheets = results[0];
                this.connectedSmSheetsIdsList = results[1];
            });
    }

    cancel() {
        this.haveExistingSheet = undefined;
        this.selectedSheet = null;
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
        return this.msProjectService
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
    createDocumentPipe(selectedProcoreFolder: ProcoreFolder): boolean | Promise<boolean> {
        if (this.PendingRequestsService.hasPendingRequest) {
            return false;
        }

        this.setExistingSheetParam(false);

        let project = this.pipesConnectionService.project;

        let procoreProjectName = project.name;
        let workspaceName = procoreProjectName.length > 30 ? procoreProjectName.slice(0, 30) + '...' : procoreProjectName;
        let newSheetName = workspaceName + ' ' + this.pipesConnectionService.getPipeLabelByType('document_pipe');

        let promises = [];

        if (!this.selectedSheet) {
            promises.push(
                this.msProjectService.createSmartsheetSheetFromTemplateInSheetsFolder(
                    project.id, this.ConfigService.getConfig('SM_DOCUMENT_TEMPLATE_ID'), newSheetName
                )
            );
        }

        let _pipeId;

        return Promise.all(promises)
            .then(([sheetToUse]) => {
                if (!sheetToUse) {
                    sheetToUse = this.selectedSheet;
                }

                return this.msProjectService.createPipe({
                    sm_sheet_id: sheetToUse.id,
                    sm_permalink: sheetToUse.permalink,
                    sm_sheet_name: sheetToUse.name,
                    project_id: project.id,
                    name: 'Document: ' + sheetToUse.name,
                    type: 'document_pipe',
                    use_schedule_chart: false,
                    procore_folder_id: selectedProcoreFolder.id
                });
            })
            .then((pipeId) => {
                _pipeId = pipeId;

                return this.pipesConnectionService.refreshPipesList();
            })
            .then(() => {
                return this.router.navigate([
                    'projects',
                    this.pipesConnectionService.project.id,
                    'edit-project',
                    'edit-document-pipe',
                    _pipeId
                ]);
            });
    }
}

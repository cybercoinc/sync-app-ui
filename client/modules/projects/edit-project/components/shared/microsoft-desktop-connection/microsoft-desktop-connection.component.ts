import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { MsProjectClientService } from 'client/service/microservices/ms-project-client.service';
import { AuthService } from 'client/service/auth.service';
import { PipeConnectionService } from 'client/service/pipe-connection.service';

import { Router, ActivatedRoute } from '@angular/router';
import { MicrosoftProject, PIPE_TYPE_TASKS } from 'client/entities/entities';
import { PendingRequestsService } from 'client/service/pending-requests.service';
import { ConfigService } from 'client/service/config.service';

@Component({
    selector: 'microsoft-desktop-connection',
    templateUrl: 'client/modules/projects/edit-project/components/shared/microsoft-desktop-connection/microsoft-desktop-connection.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/edit-project.component.css'
    ]
})
export class MicrosoftDesktopConnectionComponent implements OnInit {
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
    public microsoftProjects: MicrosoftProject[] | null = null;
    public connectedMsProjectIdsList: [number] | null = null;
    public selectedProject: MicrosoftProject | null = null;

    protected filterTimeout;

    protected columnsMatchingIsVisible: boolean = false;
    protected needToRematchColumns: boolean = false;

    protected haveExistingSheet: boolean;



    ngOnInit() {
    }

    cancelConnection() {
        return this.connection.emit(false);
    }

    confirmConnection(columnsObj): boolean | Promise<any> {
        if (this.PendingRequestsService.hasPendingRequest) {
            return false;
        }

        return this.PipeConnectionService.createNewOrGetExistingPipe(
            this.pipeType,
            false,
            {
                connected_to: 'microsoft-desktop',
                need_to_match_ms_project_columns: false,
            })
            .then(() => {
                return this.PipeConnectionService.refreshPipesList();
            });
    }

    /////////////////


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


    setExistingSheetParam(doHave: boolean) {
        this.haveExistingSheet = doHave;
    }

    startChoosingExistingProjects() {
        this.setExistingSheetParam(true);

        return Promise.all([
            this.getMicrosoftOnlineProjects(),
            this.MsProjectClientService.getConnectedMicrosoftProjectsIds()
        ])
            .then(results => {
                this.microsoftProjects = results[0];
                this.connectedMsProjectIdsList = results[1];
            })
    }

    cancel() {
        this.haveExistingSheet = undefined;
        this.selectedProject = null;
        this.columnsMatchingIsVisible = false;
    }

    filterProjects(inputName: string) {
        if (this.filterTimeout) {
            window.clearTimeout(this.filterTimeout);
        }

        this.filterTimeout = setTimeout(e => {
            this.microsoftProjects = null;
            this.selectedProject = null;

            this.getMicrosoftOnlineProjects()
                .then(microsoftProjectsList => {
                    this.microsoftProjects = microsoftProjectsList.filter(sheet => {
                        return sheet['name'].toLowerCase().indexOf(inputName.toLowerCase()) !== -1;
                    });

                    return this.microsoftProjects;
                })
        }, 500);
    }

    getSmartsheetSheets() {
        return this.MsProjectClientService
            .getSmartsheetSheets();
    }

    getMicrosoftOnlineProjects() {
        return this.MsProjectClientService
            .getMicrosoftProjects();
    }

    chooseExistingSheet(project) {
        if (this.checkIfAlreadyConnected(project)) {
            return false;
        }

        this.selectedProject = project;
    }

    checkIfAlreadyConnected(smSheet: MicrosoftProject): boolean {
        return this.connectedMsProjectIdsList.indexOf(smSheet.id) !== -1;
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

        return this.PipeConnectionService.createNewOrGetExistingPipe(
            this.pipeType,
            false,
            {
                connected_to: 'microsoft-online',
                ms_project_id: this.selectedProject.id,
                ms_project_name: this.selectedProject.name,
                ms_project_columns: columnsObj,
                need_to_match_ms_project_columns: false,
            })
            .then(() => {
                return this.PipeConnectionService.refreshPipesList();
            });
    }

    showColumnsRematch() {
        this.needToRematchColumns = true;
    }


    @Output() connection = new EventEmitter();
}

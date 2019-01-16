import { Component, OnInit, Input } from '@angular/core';
import { MsProjectClientService } from 'client/service/microservices/ms-project-client.service';
import { AuthService } from 'client/service/auth.service';
import { PipeConnectionService } from 'client/service/pipe-connection.service';

import { Router, ActivatedRoute } from '@angular/router';
import { MicrosoftProject, PIPE_TYPE_TASKS } from 'client/entities/entities';
import { PendingRequestsService } from 'client/service/pending-requests.service';
import { ConfigService } from 'client/service/config.service';

@Component({
    selector: 'microsoft-online-connection',
    templateUrl: 'client/modules/projects/edit-project/components/shared/microsoft-online-connection/microsoft-online-connection.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/shared/microsoft-online-connection/microsoft-online-connection.component.css',
        'client/modules/projects/edit-project/edit-project.component.css'
    ]
})
export class MicrosoftOnlineConnectionComponent implements OnInit {
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
    protected msProjectLink: string = null;

    ngOnInit() {
        this.PipeConnectionService.refreshPipesList();
        //
        // let isPrivate = this.pipeType == 'private_todos';
        //
        // if (this.pipeType == 'public_todos' || this.pipeType == 'private_todos') {
        //     if ((isPrivate && !this.PipeConnectionService.pipesListObj['private_todos']) ||
        //         (!isPrivate && !this.PipeConnectionService.pipesListObj['public_todos'])) {
        //         this.MsProjectClientService.getTodos(this.AuthService.authUser.id, this.PipeConnectionService.project.id, isPrivate)
        //             .then(todos => {
        //                 if (todos.length > 0) {
        //                     this.todos = todos;
        //                     this.isShowAlert = true;
        //                 }
        //             });
        //     }
        //
        // }
        this.msProjectLink = this.getMsProjectOnlineLink();
        // this.msProjectLink = `${this.AuthService.authUser.microsoft_oauth.project_url}/project%20detail%20pages/schedule.aspx?projuid=${pipeObj.ms_project_id}`
        // if need to rematch columns
        // this.needToRematchColumns = this.PipeConnectionService.pipesListObj[this.pipeType]
        //     && this.PipeConnectionService.pipesListObj[this.pipeType].need_to_match_sm_columns;

    }

    getMsProjectOnlineLink(): string {
        if (this.PipeConnectionService.pipesListObj && this.PipeConnectionService.pipesListObj[this.pipeType]) {
            return `${this.AuthService.authUser.microsoft_oauth.project_url}/project%20detail%20pages/schedule.aspx?projuid=${this.PipeConnectionService.pipesListObj[this.pipeType].ms_project_id}`;
        }

        return '';
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
    createNewMicrosoftProject(): any | boolean | Promise<boolean> {
        if (this.PendingRequestsService.hasPendingRequest) {
            return false;
        }

        this.setExistingSheetParam(false);

        let project = this.PipeConnectionService.project;

        let procoreProjectName = project.name;
        let workspaceName = procoreProjectName.length > 30 ? procoreProjectName.slice(0, 30) + '...' : procoreProjectName;
        let newSheetName = `${workspaceName} ${this.PipeConnectionService.getPipeLabelByType(this.pipeType)}`;

        let _pipeId;

        const defaultColumns = {
            actual_finish: "ActualFinish",
            actual_start: "ActualStart",
            assigned_to: "",
            description: "",
            duration: "Duration",
            end_datetime: "Finish",
            percentage_complete: "PercentComplete",
            resource: "",
            start_datetime: "Start",
            task_name: "Name"
        };

        return this.MsProjectClientService.createMicrosoftProject(newSheetName)
            .then(response => {
                return this.PipeConnectionService.createNewOrGetExistingPipe(
                    this.pipeType,
                    false,
                    {
                        connected_to: 'microsoft-online',
                        ms_project_id: response.Id,
                        ms_project_name: response.Name,
                        ms_project_columns: defaultColumns,
                        need_to_match_ms_project_columns: false,
                    })
            })
            .then(pipeId => {
                // _pipeId = pipeId;
                //
                // if (this.pipeType === PIPE_TYPE_TASKS) {
                //     return this.MsProjectClientService.addResourceColumnToSheet(_pipeId);
                // }
            })
            .then(() => {
                // return this.MsProjectClientService.matchDefaultSheetColumns(_pipeId);
            })
            .then(() => {
                return this.PipeConnectionService.refreshPipesList();
            })
            .then(() => {
                this.msProjectLink = this.getMsProjectOnlineLink();
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
            })
            .then(() => {
                this.msProjectLink = this.getMsProjectOnlineLink();
            });
    }

    showColumnsRematch() {
        this.needToRematchColumns = true;
    }
}

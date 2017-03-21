import {MsClientService} from "./ms-client.service";
import {Http} from '@angular/http';
import {
    SmartsheetSheetColumn,
    ProcoreProject,
    Project,
    SmartsheetSheet,
    ProjectPipe,
    User, SmartsheetWorkspace, SmartsheetColumn
} from 'client/entities/entities';
import {PendingRequestsService} from "../pending-requests.service";
import {Router} from "@angular/router";
import {Inject} from "@angular/core";
import {AuthService} from "../auth.service";
import {ConfigService} from "../config.service";

export class MsProjectClientService extends MsClientService {

    constructor(@Inject(Http) protected Http: Http,
                @Inject(PendingRequestsService) protected PendingRequestsService: PendingRequestsService,
                @Inject(Router) protected router: Router,
                @Inject(AuthService) protected AuthService: AuthService,
                @Inject(ConfigService) protected ConfigService: ConfigService,) {
        super(Http, PendingRequestsService, router, AuthService, ConfigService);

        this.msName = 'ms-project';
    }

    getActiveProjects(userId, companyId): Promise<Project[]> {
        return this.makeMsCall(
            'get-active-projects',
            'GET',
            {
                user_id: userId,
                company_id: companyId
            }
        );
    }

    getProjectByid(projectId: number): Promise<Project[]> {
        return this.makeMsCall(
            'find-where',
            'GET',
            {
                id: projectId
            }
        );
    }

    getSystemConnectedProjectAssigneesIds(projectId: number): Promise<number[]> {
        return this.makeMsCall(
            'projects/get-system-connected-assignees',
            'GET',
            {
                project_id: projectId
            }
        );
    }

    getProcoreProjects(userId, procoreCompanyId): Promise<ProcoreProject[]> {
        return this.makeMsCall(
            'procore/projects',
            'GET',
            {
                user_id: userId,
                procore_company_id: procoreCompanyId
            }
        );
    }

    getConnectedProcoreProjectsIds(): Promise<[number]> {
        return this.makeMsCall(
            'get-connected-procore-projects-ids',
            'GET',
            {}
        );
    }

    getSmartsheetSheets(): Promise<SmartsheetSheet[]> {
        return this.makeMsCall(
            'smartsheet/sheets',
            'GET',
            {}
        );
    }

    getConnectedSmartsheetSheetsIds(): Promise<[number]> {
        return this.makeMsCall(
            'get-connected-smartsheet-sheets-ids',
            'GET',
            {}
        );
    }

    createSmartsheetWorkspace(projectId: number, workspaceName: string): Promise<number> {
        return this.makeMsCall(
            'smartsheet/workspace',
            'POST',
            {
                workspace_name: workspaceName,
                project_id: projectId
            }
        );
    }

    getSmartsheetWorkspace(projectId: number): Promise<SmartsheetWorkspace> {
        return this.makeMsCall(
            'smartsheet/workspace',
            'GET',
            {
                project_id: projectId
            }
        );
    }

    disconnectWorkspace(projectId: number) {
        return this.makeMsCall(
            'smartsheet/workspace/disconnect',
            'DELETE',
            {
                project_id: projectId
            }
        );
    }

    createSmartsheetSheetFromTemplate(projectId: number, templateId: number, sheetName: string): Promise<SmartsheetSheet> {
        return this.makeMsCall(
            'smartsheet/create-sheet-from-template',
            'POST', {
                project_id: projectId,
                template_id: templateId,
                sheet_name: sheetName
            }
        );
    }

    createSmartsheetSheetFromTemplateInSheetsFolder(projectId: number, templateId: number, sheetName: string): Promise<SmartsheetSheet> {
        return this.makeMsCall(
            'smartsheet/create-sheet-from-template-in-sheets-folder',
            'POST', {
                project_id: projectId,
                template_id: templateId,
                sheet_name: sheetName
            }
        );
    }

    addResourceColumnToSheet(pipeId: number): Promise<SmartsheetColumn> {
        return this.makeMsCall(
            'smartsheet/add-resource-column-to-sheet',
            'POST', {
                pipe_id: pipeId
            }
        );
    }

    moveSheetToWorkspace(sheetId: number, workspaceId: number): Promise<SmartsheetSheet> {
        return this.makeMsCall(
            'smartsheet/move-sheet-to-workspace',
            'POST', {
                workspace_id: workspaceId,
                sheet_id: sheetId
            }
        );
    }

    matchDefaultSheetColumns(pipeId: number): Promise<number> {
        return this.makeMsCall(
            'smartsheet/match-default-sheet-columns',
            'POST',
            {
                pipe_id: pipeId
            }
        );
    }

    saveMatchedColumns(pipeId: number, matchedColumns): Promise<number> {
        return this.makeMsCall(
            'save-matched-columns',
            'POST',
            {
                pipe_id: pipeId,
                matched_columns: matchedColumns
            }
        );
    }

    getSmartsheetSheetColumns(smSheetId: number): Promise<[SmartsheetSheetColumn]> {
        return this.makeMsCall(
            'smartsheet/sheet-columns',
            'GET',
            {
                sm_sheet_id: smSheetId
            }
        );
    }

    getPipeById(pipeId: number): Promise<ProjectPipe[]> {
        return this.makeMsCall(
            'pipes/find-where',
            'GET',
            {
                id: pipeId,
            }
        );
    }

    getPipesWhere(whereObj): Promise<ProjectPipe[]> {
        return this.makeMsCall(
            'pipes/find-where',
            'GET',
            whereObj
        );
    }

    createPipe(data): Promise<number> {
        return this.makeMsCall(
            'pipes/create-pipe',
            'POST',
            data
        );
    }

    updatePipe(pipeId: number, dataToSet): Promise<[number]> {
        return this.makeMsCall(
            'pipes/update-pipe',
            'PUT',
            {
                pipe_id: pipeId,
                data: dataToSet,
            }
        );
    }

    enablePipe(pipeId: number): Promise<boolean> {
        return this.makeMsCall(
            'pipes/enable',
            'PUT',
            {
                pipe_id: pipeId,
            }
        );
    }

    disablePipe(pipeId: number): Promise<boolean> {
        return this.makeMsCall(
            'pipes/disable',
            'PUT',
            {
                pipe_id: pipeId,
            }
        );
    }

    deletePipe(pipeId: number): Promise<boolean> {
        return this.makeMsCall(
            'pipes/delete-pipe',
            'DELETE',
            {
                pipe_id: pipeId,
            }
        );
    }

    deleteProject(projectId: number): Promise<boolean> {
        return this.makeMsCall(
            'delete-project',
            'DELETE',
            {
                project_id: projectId,
            }
        );
    }

    /**
     *
     * @param pipeId
     * @return {Promise<{Number}>} created webhook id
     */
    createSmPipeWebhook(pipeId: number): Promise<number> {
        return this.makeMsCall(
            'pipes/create-pipe-webhook',
            'PUT',
            {
                pipe_id: pipeId,
            }
        );
    }

    changeSmPipeWebhookStatus(pipeId: number, isEnabled: boolean): Promise<boolean> {
        return this.makeMsCall(
            'pipes/change-pipe-webhook-status',
            'PUT',
            {
                pipe_id: pipeId,
                status: isEnabled
            }
        );
    }

    syncProjectUsers(projectId: number): Promise<any> {
        return this.makeMsCall(
            'procore/sync-project-users',
            'POST',
            {
                project_id: projectId
            }
        );
    }

    getProjectUsers(projectId: number): Promise<User[]> {
        return this.makeMsCall(
            'get-project-users',
            'GET',
            {
                project_id: projectId
            }
        );
    }

    getPbrUser(projectId: number): Promise<User> {
        return this.makeMsCall(
            'get-pbr-user',
            'GET',
            {
                project_id: projectId
            }
        );
    }

    setPbrUser(userId: number, projectId: number): Promise<User> {
        return this.makeMsCall(
            'set-pbr-user',
            'POST',
            {
                user_id: userId,
                project_id: projectId
            }
        );
    }

    getTodos(userId: number, projectId: number, isPrivate: boolean): Promise<any> {
        return this.makeMsCall(
            'get-todos',
            'GET',
            {
                user_id: userId,
                project_id: projectId,
                is_private: isPrivate
            }
        );
    }

    getTasks(userId: number, projectId: number): Promise<any> {
        return this.makeMsCall(
            'get-tasks',
            'GET',
            {
                user_id: userId,
                project_id: projectId
            }
        );
    }

    deleteTodos(userId, projectId, todos): Promise<any> {
        return this.makeMsCall(
            'delete-todos',
            'POST',
            {
                user_id: userId,
                project_id: projectId,
                todos: todos
            }
        );
    }

    create(data) {
        return this.makeMsCall(
            'projects',
            'POST',
            data
        );
    }

    getChartData(pipeId) {
        return this.makeMsCall(
            'chart/get-data',
            'GET',
            {
                pipe_id: pipeId
            }
        );
    }

    getAssignees(projectId: number): Promise<any> {
        return this.makeMsCall(
            'procore/get-assignees',
            'GET',
            {
                project_id: projectId
            }
        );
    }

    getResources(projectId: number): Promise<any> {
        return this.makeMsCall(
            'procore/get-resources',
            'GET',
            {
                project_id: projectId
            }
        );
    }

    getTrades(projectId: number): Promise<any> {
        return this.makeMsCall(
            'procore/project/trades',
            'GET',
            {
                project_id: projectId
            }
        );
    }

    setResourceToAssignee(data: any, projectId: number): Promise<any> {
        return this.makeMsCall(
            'set-resource',
            'POST',
            {
                data: data,
                project_id: projectId
            }
        );
    }

    getBaselines(pipeId): Promise<any> {
        return this.makeMsCall(
            'chart/get-baselines',
            'GET',
            {
                pipe_id: pipeId
            }
        );
    }

    saveScheduleGantt(pipeId, tasks, links): Promise<any> {
        return this.makeMsCall(
            'chart/save-schedule-gantt',
            'POST',
            {
                pipe_id: pipeId,
                tasks:   tasks,
                links:   links
            }
        )
    }

    createBaseline(data): Promise<any> {
        return this.makeMsCall(
            'chart/create-baseline',
            'POST',
            data
        );
    }

    update(projectId, data) {
        return this.makeMsCall(
            'update/' + projectId,
            'PUT',
            data
        );
    }


    syncAssignees(projectId): Promise<boolean> {
        return this.makeMsCall(
            'projects/sync-assignees',
            'POST',
            {
                project_id: projectId
            }
        )
    }

    getAssigneesForProjects(projectsList: any): Promise<any> {
        return this.makeMsCall(
            'report/get-assignees-for-projects',
            'GET',
            {
                projects_list: projectsList
            }
        );
    }

    getResourcesForProjects(projectsList: any): Promise<any> {
        return this.makeMsCall(
            'report/get-resources-for-projects',
            'GET',
            {
                projects_list: projectsList
            }
        );
    }

    setReportData(model: any): Promise<any> {
        return this.makeMsCall(
            'report/set-report-configurations',
            'POST',
            {
                model: model
            }
        );
    }

    getReportConfigurations(reportId: number): Promise<any> {
        return this.makeMsCall(
            'report/get-report-information',
            'GET',
            {
                report_id: reportId
            }
        );
    }

    getReportData(reportId: number): Promise<any> {
        return this.makeMsCall(
            'report/get-report-data',
            'GET',
            {
                report_id: reportId
            }
        );
    }
}

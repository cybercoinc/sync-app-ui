import { MsClientService } from './ms-client.service';
import { Http } from '@angular/http';
import {
    SmartsheetSheetColumn,
    ProcoreProject,
    Project,
    SmartsheetSheet,
    ProjectPipe,
    User, SmartsheetWorkspace, SmartsheetColumn, MicrosoftProjectColumn, MicrosoftProjectOnline
} from 'client/entities/entities';
import { PendingRequestsService } from '../pending-requests.service';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { ConfigService } from '../config.service';
import { NotificationsService } from '../../modules/notifications/notifications.service';

export class MsProjectClientService extends MsClientService {

    constructor(@Inject(Http) protected Http: Http,
                @Inject(PendingRequestsService) protected PendingRequestsService: PendingRequestsService,
                @Inject(Router) protected router: Router,
                @Inject(AuthService) protected AuthService: AuthService,
                @Inject(ConfigService) protected ConfigService: ConfigService,
                @Inject(NotificationsService) protected NotificationsService: NotificationsService) {
        super(Http, PendingRequestsService, router, AuthService, ConfigService, NotificationsService);

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

    /**
     * Get microsoft projects
     */
    getMicrosoftProjects(): Promise<SmartsheetSheet[]> {
        return this.makeMsCall(
            'microsoft-online/projects',
            'GET',
            {}
        );
    }

    /**
     * Create microsoft projects
     */
    createMicrosoftProject(name: string): Promise<MicrosoftProjectOnline> {
        return this.makeMsCall(
            'microsoft-online/projects',
            'POST',
            {
                name
            }
        );
    }

    /**
     * Get connected microsoft projects
     */
    getConnectedMicrosoftProjectsIds(): Promise<[number]> {
        return this.makeMsCall(
            'get-connected-microsoft-projects-ids',
            'GET',
            {}
        );
    }

    /**
     * Get microsoft project columns
     */
    getMicrosoftProjectColumns(): Promise<[MicrosoftProjectColumn]> {
        return this.makeMsCall(
            'microsoft-online/project-columns',
            'GET'
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
                id: pipeId
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

    getPipesByProjectsIds(projectsIdsList: number[]): Promise<ProjectPipe[]> {
        return this.makeMsCall(
            'pipes/get-pipes-by-projects-ids',
            'POST',
            {
                projects_ids: projectsIdsList
            }
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
                data: dataToSet
            }
        );
    }

    enablePipe(pipeId: number): Promise<boolean> {
        return this.makeMsCall(
            'pipes/enable',
            'PUT',
            {
                pipe_id: pipeId
            }
        );
    }

    pushStartPipeSyncToQueue(pipeId: number): Promise<boolean> {
        return this.makeMsCall(
            'pipes/push-start-pipe-sync-to-queue',
            'POST',
            {
                pipe_id: pipeId
            }
        );
    }

    disablePipe(pipeId: number): Promise<boolean> {
        return this.makeMsCall(
            'pipes/disable',
            'PUT',
            {
                pipe_id: pipeId
            }
        );
    }

    deletePipe(pipeId: number): Promise<boolean> {
        return this.makeMsCall(
            'pipes/delete-pipe',
            'DELETE',
            {
                pipe_id: pipeId
            }
        );
    }

    deleteProject(projectId: number): Promise<boolean> {
        return this.makeMsCall(
            'delete-project',
            'DELETE',
            {
                project_id: projectId
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
                pipe_id: pipeId
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

    createProcoreProjectWebhook(projectId: number): Promise<{ id: number }> {
        return this.makeMsCall(
            'projects/create-procore-project-webhook',
            'POST',
            {
                project_id: projectId
            }
        );
    }

    checkIfProcoreWebhookEnabled(projectId: number): Promise<boolean> {
        return this.makeMsCall(
            `projects/procore-webhook-enabled`,
            'GET',
            {
                project_id: projectId
            }
        );
    }

    removeProcoreProjectWebhook(projectId: number): Promise<boolean> {
        return this.makeMsCall(
            `projects/remove-procore-project-webhook`,
            'DELETE',
            {
                project_id: projectId
            }
        );
    }

    addProcoreWebhookTriggers(projectId: number, pipeId: number, resource: 'ToDos' | 'Tasks'): Promise<boolean> {
        return this.makeMsCall(
            'projects/add-procore-webhook-triggers',
            'POST',
            {
                project_id: projectId,
                pipe_id: pipeId,
                resource
            }
        );
    }

    removeProcoreWebhookTriggers(projectId: number, resource: 'ToDos' | 'Tasks'): Promise<boolean> {
        return this.makeMsCall(
            'projects/remove-procore-webhook-triggers',
            'POST',
            {
                project_id: projectId,
                resource
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

    getUserToProjectPermissions(userId: number, projectId: number) {
        return this.makeMsCall(
            'get-assignee-to-project-permissions',
            'GET',
            {
                project_id: projectId,
                user_id: userId
            }
        );
    }

    setUserToProjectPermissions(userId: number, projectId: number, data = {}) {
        return this.makeMsCall(
            'set-assignee-to-project-permissions',
            'POST',
            {
                project_id: projectId,
                user_id: userId,
                data: data
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

    addResource(resource: string, projectId: number): Promise<any> {
        return this.makeMsCall(
            'add-resource',
            'POST',
            {
                resource: resource,
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
                tasks: tasks,
                links: links
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

    saveToCsv(data: any, tableHeaders: any, reportId: number): Promise<any> {
        return this.makeMsCall(
            'report/save-to-csv',
            'POST',
            {
                data: data,
                table_headers: tableHeaders,
                report_id: reportId
            }
        );
    }

    getNotificationPolicy(conditions): Promise<any> {
        return this.makeMsCall(
            'notification-policy/find-where',
            'GET',
            conditions
        );
    }

    createNotificationPolicy(data): Promise<any> {
        return this.makeMsCall(
            'notification-policy/create',
            'POST',
            data
        );
    }

    updateNotificationPolicy(policyId, data): Promise<any> {
        return this.makeMsCall(
            'notification-policy/update/' + policyId,
            'PUT',
            data
        );
    }

    removeNotificationPolicy(policyId): Promise<any> {
        return this.makeMsCall(
            'notification-policy/delete-where',
            'POST',
            {
                id: policyId
            }
        );
    }

    getProcoreProjectFolders(project_id: number) {
        return this.makeMsCall(
            'projects/procore-folders',
            'GET',
            {project_id}
        );
    }

    getProcoreProjectFolder(procore_folder_id: number, project_id: number) {
        return this.makeMsCall(
            'projects/procore-folder',
            'GET',
            {procore_folder_id, project_id}
        );
    }

    quickSetupProject(project_id: number) {
        return this.makeMsCall(
            'projects/quick-setup',
            'POST',
            {project_id}
        );
    }
}

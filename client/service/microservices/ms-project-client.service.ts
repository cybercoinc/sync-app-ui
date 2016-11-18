import {MsClientService} from "./ms-client.service";
import {Headers, Http, URLSearchParams} from '@angular/http';
import {SmartsheetSheetColumn, ProcoreProject, Project, SmartsheetSheet, ProjectPipe} from 'client/entities/entities';
import {PendingRequestsService} from "../pending-requests.service";

export class MsProjectClientService extends MsClientService {

    constructor(protected Http: Http, protected PendingRequestsService: PendingRequestsService) {
        super(Http, PendingRequestsService);

        this.url = this.getServiceUrl('ms-project');
    }

    getActiveProjects(userId, authUserSessionId): Promise<Project[]> {
        return this.makeMsCall(
            'find-where',
            'GET',
            {
                status: 'active',
                user_fk_id: userId
            },
            authUserSessionId
        );
    }

    getProjectByid(projectId: number, authUserSessionId: string): Promise<Project[]> {
        return this.makeMsCall(
            'find-where',
            'GET',
            {
                id: projectId
            },
            authUserSessionId
        );
    }

    getProcoreProjects(userId, authUserSessionId): Promise<ProcoreProject[]> {
        return this.makeMsCall(
            'get-procore-projects',
            'GET',
            {
                user_id: userId
            },
            authUserSessionId
        );
    }

    getConnectedProcoreProjectsIds(userId, authUserSessionId): Promise<[number]> {
        return this.makeMsCall(
            'get-connected-procore-projects-ids',
            'GET',
            {
                user_id: userId
            },
            authUserSessionId
        );
    }

    getSmartsheetSheets(userId, authUserSessionId): Promise<SmartsheetSheet[]> {
        return this.makeMsCall(
            'get-smartsheet-sheets',
            'GET',
            {
                user_id: userId
            },
            authUserSessionId
        );
    }

    getConnectedSmartsheetSheetsIds(projectId: number, authUserSessionId): Promise<[number]> {
        return this.makeMsCall(
            'get-connected-smartsheet-sheets-ids',
            'GET',
            {
                project_id: projectId
            },
            authUserSessionId
        );
    }

    createSmartsheetWorkspace(projectId: number, workspaceName: string, authUserSessionId: string): Promise<{
        id: number,
        permalink: string
    }> {
        return this.makeMsCall(
            'create-smartsheet-workspace',
            'POST',
            {
                workspace_name: workspaceName,
                project_id: projectId
            },
            authUserSessionId
        );
    }

    createSmartsheetSheetFromTemplate(projectId: number, workspaceId: number, templateId: number, sheetName: string, authUserSessionId: string): Promise<SmartsheetSheet> {
        return this.makeMsCall(
            'create-sheet-from-template-in-workspace',
            'POST', {
                project_id: projectId,
                workspace_id: workspaceId,
                template_id: templateId,
                sheet_name: sheetName
            },
            authUserSessionId
        );
    }

    moveSheetToWorkspace(projectId: number, sheetId: number, workspaceId: number, authUserSessionId: string): Promise<SmartsheetSheet> {
        return this.makeMsCall(
            'move-sheet-to-workspace',
            'POST', {
                project_id: projectId,
                workspace_id: workspaceId,
                sheet_id: sheetId
            },
            authUserSessionId
        );
    }

    matchDefaultSheetColumns(projectId: number, pipeId: number, authUserSessionId: string): Promise<number> {
        return this.makeMsCall(
            'match-default-sheet-columns',
            'POST',
            {
                project_id: projectId,
                pipe_id: pipeId
            },
            authUserSessionId
        );
    }

    saveMatchedColumns(pipeId: number, matchedColumns, authUserSessionId: string): Promise<number> {
        return this.makeMsCall(
            'save-matched-columns',
            'POST',
            {
                pipe_id: pipeId,
                matched_columns: matchedColumns
            },
            authUserSessionId
        );
    }

    getSmartsheetSheetColumns(userId: number, smSheetId: number, authUserSessionId: string): Promise<[SmartsheetSheetColumn]> {
        return this.makeMsCall(
            'get-smartsheet-sheet-columns',
            'GET',
            {
                user_id: userId,
                sm_sheet_id: smSheetId
            },
            authUserSessionId
        );
    }

    getPipesByProjectId(projectId: number, authUserSessionId: string): Promise<ProjectPipe[]> {
        return this.makeMsCall(
            'get-pipes-by-project-id',
            'GET',
            {
                project_id: projectId,
            },
            authUserSessionId
        );
    }

    getPipeById(pipeId: number, authUserSessionId: string): Promise<ProjectPipe> {
        return this.makeMsCall(
            'get-pipe',
            'GET',
            {
                pipe_id: pipeId,
            },
            authUserSessionId
        );
    }

    getPipesWhere(whereObj, authUserSessionId: string): Promise<ProjectPipe[]> {
        return this.makeMsCall(
            'get-pipe-where',
            'GET',
            whereObj,
            authUserSessionId
        );
    }

    createPipe(projectId: number, dataToSet, pipeName: string, authUserSessionId: string): Promise<number> {
        return this.makeMsCall(
            'create-pipe',
            'POST',
            {
                project_id: projectId,
                data: dataToSet,
                pipe_name: pipeName
            },
            authUserSessionId
        );
    }

    updatePipe(pipeId: number, dataToSet, authUserSessionId: string): Promise<[number]> {
        return this.makeMsCall(
            'update-pipe',
            'PUT',
            {
                pipe_id: pipeId,
                data: dataToSet,
            },
            authUserSessionId
        );
    }

    deletePipe(pipeId: number, authUserSessionId: string): Promise<boolean> {
        return this.makeMsCall(
            'delete-pipe',
            'DELETE',
            {
                pipe_id: pipeId,
            },
            authUserSessionId
        );
    }

    deleteProject(projectId: number, authUserSessionId: string): Promise<boolean> {
        return this.makeMsCall(
            'delete-project',
            'DELETE',
            {
                project_id: projectId,
            },
            authUserSessionId
        );
    }

    /**
     *
     * @param pipeId
     * @param authUserSessionId
     * @return {Promise<{Number}>} created webhook id
     */
    createSmPipeWebhook(pipeId: number, authUserSessionId: string): Promise<number> {
        return this.makeMsCall(
            'create-pipe-webhook',
            'PUT',
            {
                pipe_id: pipeId,
            },
            authUserSessionId
        );
    }

    changeSmPipeWebhookStatus(pipeId: number, isEnabled: boolean, authUserSessionId: string): Promise<boolean> {
        return this.makeMsCall(
            'change-pipe-webhook-status',
            'PUT',
            {
                pipe_id: pipeId,
                status: isEnabled
            },
            authUserSessionId
        );
    }
}

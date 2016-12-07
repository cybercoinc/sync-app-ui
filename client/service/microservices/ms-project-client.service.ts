import {MsClientService} from "./ms-client.service";
import {Http} from '@angular/http';
import {
    SmartsheetSheetColumn,
    ProcoreProject,
    Project,
    SmartsheetSheet,
    ProjectPipe,
    User
} from 'client/entities/entities';
import {PendingRequestsService} from "../pending-requests.service";
import {Router} from "@angular/router";

export class MsProjectClientService extends MsClientService {

    constructor(protected Http: Http, protected PendingRequestsService: PendingRequestsService, protected router: Router) {
        super(Http, PendingRequestsService, router);

        this.url = this.getServiceUrl('ms-project');
    }

    getActiveProjects(userId, authTokenId): Promise<Project[]> {
        return this.makeMsCall(
            'get-active-projects',
            'GET',
            {
                user_id: userId
            },
            authTokenId
        );
    }

    getProjectByid(projectId: number, authTokenId): Promise<Project[]> {
        return this.makeMsCall(
            'find-where',
            'GET',
            {
                id: projectId
            },
            authTokenId
        );
    }

    getProcoreProjects(userId, authTokenId): Promise<ProcoreProject[]> {
        return this.makeMsCall(
            'get-procore-projects',
            'GET',
            {
                user_id: userId
            },
            authTokenId
        );
    }

    getConnectedProcoreProjectsIds(authTokenId): Promise<[number]> {
        return this.makeMsCall(
            'get-connected-procore-projects-ids',
            'GET',
            {},
            authTokenId
        );
    }

    getSmartsheetSheets(userId, authTokenId): Promise<SmartsheetSheet[]> {
        return this.makeMsCall(
            'get-smartsheet-sheets',
            'GET',
            {
                user_id: userId
            },
            authTokenId
        );
    }

    getConnectedSmartsheetSheetsIds(authTokenId): Promise<[number]> {
        return this.makeMsCall(
            'get-connected-smartsheet-sheets-ids',
            'GET',
            {},
            authTokenId
        );
    }

    createSmartsheetWorkspace(projectId: number, workspaceName: string, authTokenId): Promise<{
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
            authTokenId
        );
    }

    createSmartsheetSheetFromTemplate(projectId: number, workspaceId: number, templateId: number, sheetName: string, authTokenId): Promise<SmartsheetSheet> {
        return this.makeMsCall(
            'create-sheet-from-template-in-workspace',
            'POST', {
                project_id: projectId,
                workspace_id: workspaceId,
                template_id: templateId,
                sheet_name: sheetName
            },
            authTokenId
        );
    }

    moveSheetToWorkspace(projectId: number, sheetId: number, workspaceId: number, authTokenId): Promise<SmartsheetSheet> {
        return this.makeMsCall(
            'move-sheet-to-workspace',
            'POST', {
                project_id: projectId,
                workspace_id: workspaceId,
                sheet_id: sheetId
            },
            authTokenId
        );
    }

    matchDefaultSheetColumns(projectId: number, pipeId: number, authTokenId): Promise<number> {
        return this.makeMsCall(
            'match-default-sheet-columns',
            'POST',
            {
                project_id: projectId,
                pipe_id: pipeId
            },
            authTokenId
        );
    }

    saveMatchedColumns(pipeId: number, matchedColumns, authTokenId): Promise<number> {
        return this.makeMsCall(
            'save-matched-columns',
            'POST',
            {
                pipe_id: pipeId,
                matched_columns: matchedColumns
            },
            authTokenId
        );
    }

    getSmartsheetSheetColumns(userId: number, smSheetId: number, authTokenId): Promise<[SmartsheetSheetColumn]> {
        return this.makeMsCall(
            'get-smartsheet-sheet-columns',
            'GET',
            {
                user_id: userId,
                sm_sheet_id: smSheetId
            },
            authTokenId
        );
    }

    getPipeById(pipeId: number, authTokenId): Promise<ProjectPipe> {
        return this.makeMsCall(
            'pipes/find-where',
            'GET',
            {
                id: pipeId,
            },
            authTokenId
        );
    }

    getPipesWhere(whereObj, authTokenId): Promise<ProjectPipe[]> {
        return this.makeMsCall(
            'pipes/find-where',
            'GET',
            whereObj,
            authTokenId
        );
    }

    createPipe(projectId: number, dataToSet, pipeName: string, authTokenId): Promise<number> {
        return this.makeMsCall(
            'create-pipe',
            'POST',
            {
                project_id: projectId,
                data: dataToSet,
                pipe_name: pipeName
            },
            authTokenId
        );
    }

    updatePipe(pipeId: number, dataToSet, authTokenId): Promise<[number]> {
        return this.makeMsCall(
            'update-pipe',
            'PUT',
            {
                pipe_id: pipeId,
                data: dataToSet,
            },
            authTokenId
        );
    }

    deletePipe(pipeId: number, authTokenId): Promise<boolean> {
        return this.makeMsCall(
            'delete-pipe',
            'DELETE',
            {
                pipe_id: pipeId,
            },
            authTokenId
        );
    }

    deleteProject(projectId: number, authTokenId): Promise<boolean> {
        return this.makeMsCall(
            'delete-project',
            'DELETE',
            {
                project_id: projectId,
            },
            authTokenId
        );
    }

    /**
     *
     * @param pipeId
     * @param authTokenId
     * @return {Promise<{Number}>} created webhook id
     */
    createSmPipeWebhook(pipeId: number, authTokenId): Promise<number> {
        return this.makeMsCall(
            'create-pipe-webhook',
            'PUT',
            {
                pipe_id: pipeId,
            },
            authTokenId
        );
    }

    changeSmPipeWebhookStatus(pipeId: number, isEnabled: boolean, authTokenId): Promise<boolean> {
        return this.makeMsCall(
            'pipes/change-pipe-webhook-status',
            'PUT',
            {
                pipe_id: pipeId,
                status: isEnabled
            },
            authTokenId
        );
    }

    syncProjectUsers(projectId: number, authTokenId): Promise<any> {
        return this.makeMsCall(
            'sync-project-users',
            'POST',
            {
                project_id: projectId
            },
            authTokenId
        );
    }

    getProjectUsers(projectId: number, authTokenId): Promise<User[]> {
        return this.makeMsCall(
            'get-project-users',
            'GET',
            {
                project_id: projectId
            },
            authTokenId
        );
    }

    getPbrUser(projectId: number, authTokenId): Promise<User> {
        return this.makeMsCall(
            'get-pbr-user',
            'GET',
            {
                project_id: projectId
            },
            authTokenId
        );
    }
}

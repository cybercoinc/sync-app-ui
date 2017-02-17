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
import {Inject} from "@angular/core";
import {AuthService} from "../auth.service";
import {ConfigService} from "../config.service";

export class MsProjectClientService extends MsClientService {

    constructor(@Inject(Http) protected Http: Http,
                @Inject(PendingRequestsService) protected PendingRequestsService: PendingRequestsService,
                @Inject(Router) protected router: Router,
                @Inject(AuthService) protected AuthService: AuthService,
                @Inject(ConfigService) protected ConfigService: ConfigService,
    ) {
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

    getSmartsheetSheets(userId): Promise<SmartsheetSheet[]> {
        return this.makeMsCall(
            'smartsheet/sheets',
            'GET',
            {
                user_id: userId
            }
        );
    }

    getConnectedSmartsheetSheetsIds(): Promise<[number]> {
        return this.makeMsCall(
            'get-connected-smartsheet-sheets-ids',
            'GET',
            {}
        );
    }

    createSmartsheetWorkspace(projectId: number, workspaceName: string): Promise<{
        id: number,
        permalink: string
    }> {
        return this.makeMsCall(
            'smartsheet/create-workspace',
            'POST',
            {
                workspace_name: workspaceName,
                project_id: projectId
            }
        );
    }

    getSmartsheetWorkspace(projectId: number) {
        return this.makeMsCall(
            'smartsheet/workspace',
            'GET',
            {
                project_id: projectId
            }
        );
    }

    createSmartsheetSheetFromTemplate(projectId: number, workspaceId: number, templateId: number, sheetName: string): Promise<SmartsheetSheet> {
        return this.makeMsCall(
            'smartsheet/create-sheet-from-template-in-workspace',
            'POST', {
                project_id: projectId,
                workspace_id: workspaceId,
                template_id: templateId,
                sheet_name: sheetName
            }
        );
    }

    moveSheetToWorkspace(projectId: number, sheetId: number, workspaceId: number): Promise<SmartsheetSheet> {
        return this.makeMsCall(
            'smartsheet/move-sheet-to-workspace',
            'POST', {
                project_id: projectId,
                workspace_id: workspaceId,
                sheet_id: sheetId
            }
        );
    }

    matchDefaultSheetColumns(projectId: number, pipeId: number): Promise<number> {
        return this.makeMsCall(
            'smartsheet/match-default-sheet-columns',
            'POST',
            {
                project_id: projectId,
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

    getSmartsheetSheetColumns(userId: number, smSheetId: number): Promise<[SmartsheetSheetColumn]> {
        return this.makeMsCall(
            'smartsheet/sheet-columns',
            'GET',
            {
                user_id: userId,
                sm_sheet_id: smSheetId
            }
        );
    }

    getPipeById(pipeId: number): Promise<ProjectPipe> {
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

    createPipe(projectId: number, dataToSet, pipeName: string): Promise<number> {
        return this.makeMsCall(
            'pipes/create-pipe',
            'POST',
            {
                project_id: projectId,
                data: dataToSet,
                pipe_name: pipeName
            }
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
                user_id:    userId,
                project_id: projectId
            }
        );
    }

    getTodos(userId: number, projectId: number, isPrivate: boolean): Promise<any> {
        return this.makeMsCall(
            'get-todos',
            'GET',
            {
                user_id:    userId,
                project_id: projectId,
                is_private: isPrivate
            }
        );
    }


    deleteTodos(userId, projectId, todos): Promise<any> {
        return this.makeMsCall(
            'delete-todos',
            'POST',
            {
                user_id:    userId,
                project_id: projectId,
                todos:      todos
            }
        );
    }
}

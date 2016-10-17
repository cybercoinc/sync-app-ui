import {MsClientService} from "./ms-client.service";
import {Headers, Http, URLSearchParams} from '@angular/http';

export class MsProjectClientService extends MsClientService {

    constructor(protected Http: Http) {
        super(Http);

        this.url = this.getServiceUrl('ms-project');
    }

    getActiveProjects(userId, authUserSessionId): Promise<[{}]> {
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

    getProjectByid(projectId: number, authUserSessionId: string): Promise<[{}]> {
        return this.makeMsCall(
            'find-where',
            'GET',
            {
                id: projectId
            },
            authUserSessionId
        );
    }

    getProcoreProjects(userId, authUserSessionId): Promise<[{
        is_connected: boolean
    }]> {
        return this.makeMsCall(
            'get-procore-projects',
            'GET',
            {
                user_id: userId
            },
            authUserSessionId
        );
    }

    getSmartsheetProjects(userId, authUserSessionId): Promise<[{}]> {
        return this.makeMsCall(
            'get-smartsheet-projects',
            'GET',
            {
                user_id: userId
            },
            authUserSessionId
        );
    }

    createSmartsheetWorkspace(data: {
        workspaceName: string,
        projectId: number
    }, authUserSessionId: string): Promise<{
        id: number,
        permalink: string
    }> {
        return this.makeMsCall(
            'create-smartsheet-workspace',
            'POST',
            data,
            authUserSessionId
        );
    }

    createSmartsheetSheetFromTemplate(data: {
        workspaceId: number,
        projectId: number,
        templateId: number,
        sheetName: string
    }, authUserSessionId: string): Promise<{
        accessLevel: string,
        id: number,
        name: string,
        permalink: string
    }> {
        return this.makeMsCall(
            'create-sheet-from-template-in-workspace',
            'POST',
            data,
            authUserSessionId
        );
    }

    /**
     *
     * @param data
     * @param authUserSessionId
     * @return {Promise<number>} project id
     */
    matchDefaultSheetColumns(data: {projectId: number}, authUserSessionId: string): Promise<number> {
        return this.makeMsCall(
            'match-default-sheet-columns',
            'POST',
            data,
            authUserSessionId
        );
    }

    getSmartsheetSheetColumns(userId: number, smSheetId: number, authUserSessionId: string): Promise<[{}]> {
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
}

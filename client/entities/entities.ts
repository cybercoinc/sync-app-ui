export class User {
    id: number;
    first_name: string;
    last_name: string;

    smartsheet_oauth: {
        access_token: string,
        refresh_token: string,
        expires_in: number
    };

    auth_session_id: string;
    created_at: Date;
    email: string;
    pr_user_id: number; // procore user id
    procore_oauth: {
        access_token: string;
        refresh_token: string;
        expires_in: number;
        token_type: string;
        created_at: number;
        account_email: string
    }
}

export class SyncSession {
    created_at: Date;
    project_fk_id: number;
    started_by: 'cron' | 'user';
    status: 'created' | 'completed';
    sync_timte: {
        sm_to_pr_sync_seconds: number;
        pr_to_sm_sync_seconds: number;
        total_sync_seconds: number;
    }
}

export class Item {
    created_at: Date;
    assignee_email: string;
    description: string;
    finish_datetime: string; // for example 2016-10-04
    name: string;
    need_to_process: boolean;
    percentage: number;
    procore_id: number;
    procore_project_id: number;
    sm_sheet_id: number;
    smartsheet_id: number;
    smartsheet_parent_id: number;
    start_datetime: string; // for example 2016-10-04
    type: 'todos'
}

export class ItemChanges {
    created_at: Date;
    source: 'smartsheet' | 'procore';
    sync_session_fk_id: number;
    type: 'created_one|changed_one|deleted_one';
    data: {
        item: Item,
        changes: [{property: string; old_value: string|number;new_value: string|number}]
    }
}

export class ProcoreProject {
    active: boolean;
    name: string;
    address: string;
    city: string;
    country_code: string;
    created_at: string;
    company: {
        id: number,
        name: string
    };
    id: number
}

/**
 * Schedule Connector project entity.
 */
export class Project {
    id: number;
    procore_project_id: number;
    name: string;
    status: 'active'  | 'inactive';
    procore_company_id: number;
    user_fk_id: number
}

export class ProcoreTodoColumn {
    slug: string;
    title: string;
}

export class SmartsheetSheet {
    accessLevel: string;
    createdAt: string;
    id: number;
    modifiedAt: string;
    name: string;
    permalink: string;
}

export class SmartsheetSheetColumn {
    id: number;
    index: number;
    primary: string;
    title: string;
    type: string;
    width: number;
}

export class ProjectPipe {
    id: number;
    created_at: Date;
    type: 'public_todos' | 'private_todos' | 'tasks';
    project_fk_id: number;
    smartsheet_sheet_id: number;
}
import {Timestamp} from "rxjs";
export class User {
    id: number;
    first_name: string;
    last_name: string;

    smartsheet_oauth: {
        access_token: string,
        refresh_token: string,
        expires_in: number,
        account_email: string;
        token_type: string;
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
    id: number;
    created_at: Date;
    started_at: Timestamp<number>;
    finished_at: Timestamp<number>;
    pipe_fk_id: {
        id: number;
        kind: string;
        namespace: string;
        path: string|number[]
    };
    started_by: 'cron' | 'user' | 'webhook';
    status: 'created' | 'completed' | 'failed';
    has_item_changes: boolean;
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


export const ITEM_CHANGES_TYPE_CREATED_ONE = 'created_one';
export const ITEM_CHANGES_TYPE_CHANGED_ONE = 'changed_one';
export const ITEM_CHANGES_TYPE_DELETED_ONE = 'deleted_one';

export class ItemChanges {
    created_at: Date;
    source: 'smartsheet' | 'procore';
    sync_session_fk_id: {
        id: number;
        kind: string;
        namespace: string;
        path: string|number[]
    };
    type: 'created_one'|'changed_one'|'deleted_one';
    item: Item;
    changes: [{property: string; old_value: string|number;new_value: string|number}];
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
    user_fk_id: {
        id: number;
        kind: string;
        namespace: string;
        path: string|number[]
    }
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
    status: 'active' | 'disabled';
    project_fk_id: {
        id: number;
        kind: string;
        namespace: string;
        path: string|number[]
    };
    user_fk_id: {
        id: number;
        kind: string;
        namespace: string;
        path: string|number[]
    };
    procore_project_id: number;
    procore_company_id: number;
    sm_sheet_id: number;
    sm_sheet_columns: {
        description: number,
        task_name: number,
        duration: number,
        end_datetime: number,
        assigned_to: number,
        start_datetime: number,
        percentage_complete: number
    };
    sm_permalink: string;
    sm_working_days: {};
    sm_weekends: [string];
    sm_webhook_id: number;
    sm_webhook_status: string;
}

export const PIPE_TYPE_PUBLIC_TODOS = 'public_todos';
export const PIPE_TYPE_PRIVATE_TODOS = 'private_todos';
export const PIPE_TYPE_TASKS = 'tasks';

export const PIPE_STATUS_ACTIVE = 'active';
export const PIPE_STATUS_DISABLED = 'disabled';
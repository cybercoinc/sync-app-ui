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
    created_at: Date;
    role: string;
    email: string;
    is_login_as_allowed: boolean;
    disable_task_notification: boolean;
    pr_user_id: number; // procore user id
    as_admin: boolean;
    procore_oauth: {
        access_token: string;
        refresh_token: string;
        expires_in: number;
        token_type: string;
        created_at: number;
        account_email: string
    };
    microsoft_oauth: {
        expires_on: string,
        resource: string,
        token_type: string,
        account_email: string,
        refresh_token: string,
        not_before: number,
        expires_in: number,
        created_at: number,
        access_token: string,
        project_url: string,
    };
}

export class Company {
    id: number;
    name: string;
    is_active: boolean;
    procore_id: boolean;
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
        path: string | number[]
    };
    started_by: 'cron' | 'user' | 'webhook';
    status: 'created' | 'completed' | 'failed';
    has_item_changes: boolean;
    sync_timte: {
        sm_to_pr_sync_seconds: number;
        pr_to_sm_sync_seconds: number;
        total_sync_seconds: number;
    };
    err: {
        message: string;
        refs: {}[];
    }
}

export class Item {
    created_at: Date;
    description: string;
    finish_datetime: string; // for example 2016-10-04
    name: string;
    need_to_process: boolean;
    percentage: number;
    procore_id: number;
    procore_project_id: number;
    sm_sheet_id: number;
    smartsheet_id: number;
    assignee_fk_id: number;
    smartsheet_parent_id: number;
    start_datetime: string; // for example 2016-10-04
    type: 'todos'
}


export const ITEM_CHANGES_TYPE_CREATED_ONE = 'created_one';
export const ITEM_CHANGES_TYPE_CHANGED_ONE = 'changed_one';
export const ITEM_CHANGES_TYPE_DELETED_ONE = 'deleted_one';

export class ItemChanges {
    created_at: Date;
    source: 'smartsheet' | 'procore' | 'schedule';
    sync_session_fk_id: {
        id: number;
        kind: string;
        namespace: string;
        path: string | number[]
    };
    type: 'created_one' | 'changed_one' | 'deleted_one';
    item: Item;
    changes: [{ property: string; old_value: string | number; new_value: string | number }];
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
    status: 'active' | 'disabled';
    procore_company_id: number;
    creds_holder__user_fk_id: {
        id: number;
        kind: string;
        namespace: string;
        path: string | number[]
    };
    smartsheet_workspace_creator__user_fk_id: {
        id: number;
        kind: string;
        namespace: string;
        path: string | number[]
    };
    disabled_reason: string;
    smartsheet_workspace_id: number;
    is_enable_notifications: boolean;
    notification_cc_emails: string[];
    creator__user_fk_id: {
        id: number;
        kind: string;
        namespace: string;
        path: string | number[]
    };
    holidays:     string[];
    working_days: string[];
    is_separate_invoice: boolean;
    procore_webhook_triggers: any[];
    procore_webhook_id: number;
}

export class SmartsheetWorkspace {
    id: number;
    name: string;
    favorite: boolean; // Returned only if the user has marked the Workspace as a Favorite in their Home tab (value = ???true???)
    accessLevel: string; // User???s permissions on the Workspace
    permalink: string;
    sheets: SmartsheetSheet[];
    folders: {}[]; // Array of Folder objects
    reports: {}[]; // Array of Report objects
    templates: {}[]; // Array of Template objects
}

export class ProcoreTodoColumn {
    slug: string;
    title: string | [string];
    type: string | [string];
}

export class SmartsheetSheet {
    accessLevel: string;
    createdAt: string;
    id: number;
    modifiedAt: string;
    name: string;
    permalink: string;
}

export class MicrosoftProject {
    createdAt: string;
    id: number;
    modifiedAt: string;
    name: string;
}

export class MicrosoftProjectOnline {
    Id: number;
    Name: string;
}

/**
 * https://smartsheet-platform.github.io/api-docs/?shell#column-object
 */
export class SmartsheetColumn {
    id: number;
    index: number;
    primary: boolean;
    type:
        'TEXT_NUMBER'
        | 'DATE'
        | 'DATETIME'
        | 'CONTACT_LIST'
        | 'CHECKBOX'
        | 'PICKLIST'
        | 'DURATION'
        | 'PREDECESSOR'
        | 'ABSTRACT_DATETIME';
    options: string[];
    hidden: boolean;
    symbol: string;
    systemColumnType: string;
    tags: string[];
    width: number;
    format: string;
    filter: {};
    locked: boolean;
    lockedForUser: boolean;
}

export class SmartsheetSheetColumn {
    id: number;
    index: number;
    primary: string;
    title: string;
    type: string;
    width: number;
    isDisabled: boolean;
}

export class MicrosoftProjectColumn {
    id: number;
    index: number;
    primary: string;
    value: string;
    title: string;
    type: string;
    width: number;
}

export class ProjectPipe {
    id: number;
    created_at: Date;
    type: 'public_todos' | 'private_todos' | 'tasks' | 'document_pipe';
    status: 'active' | 'disabled';
    project_fk_id: {
        id: number;
        kind: string;
        namespace: string;
        path: string | number[]
    };
    creds_holder__user_fk_id: {
        id: number;
        kind: string;
        namespace: string;
        path: string | number[]
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
        baseline_start: number
        baseline_end: number
    };
    sm_permalink: string;
    sm_working_days: {};
    sm_weekends: [string];
    sm_webhook_id: number;
    sm_webhook_latest_status: string;
    sm_sheet_name: string;
    summary_tasks_enabled: boolean;
    need_to_match_sm_columns: boolean;
    colors_coding_enabled: boolean;
    use_schedule_chart: boolean;
    connected_to: string;
    options: {
        procore_pdf_size: string
    };
}

export class Invoice {
    id:             number;
    amount:         number;
    created_at:     Date;
    is_deleted:     boolean;
    last_notified:  Date | null;
    license_ids:    number[];
    line_items:     [{}];
    invoice_number: string;
    payment_status: 'Open' | 'PAID';
    xero_invoice_id: string;
    payment_link:    string;
    billing__user_fk_id: {
        id:        number;
        kind:      string;
        namespace: string;
        path:      string | number[]
    } | null;
}

export class Assignee {
    id: number;
    email: string;
    alternative_emails:  string | null;
    first_name: string;
    last_name: string;
    procore_user_id: number;
    resource_id: number | null;
    project_fk_id: {
        id:        number;
        kind:      string;
        namespace: string;
        path:      string | number[]
    };
}

export class Resource {
    id: number;
    name: string;
    pr_resource_id: number;
    pr_trade_id	: number;
    project_fk_id: {
        id:        number;
        kind:      string;
        namespace: string;
        path:      string | number[]
    };
}

export class NotificationPolicy {
    id: number;
    name: string;
    is_enabled: boolean;
    type: string;
    time: string;
    schedule: string;
    project_fk_id: {
        id:        number;
        kind:      string;
        namespace: string;
        path:      string | number[]
    };
    params: any = {};
}

export const INVOICE_STATUS_OPEN = 'Open';
export const INVOICE_STATUS_PAID = 'PAID';

export const PIPE_TYPE_PUBLIC_TODOS = 'public_todos';
export const PIPE_TYPE_PRIVATE_TODOS = 'private_todos';
export const PIPE_TYPE_TASKS = 'tasks';

export const PIPE_STATUS_ACTIVE = 'active';
export const PIPE_STATUS_DISABLED = 'disabled';

export const PROJECT_STATUS_DISABLED = 'disabled';

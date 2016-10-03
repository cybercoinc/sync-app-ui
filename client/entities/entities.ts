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
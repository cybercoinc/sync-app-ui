export class Config {
    public static getEnvironmentVariable(value) {
        let environment: string;
        let data = {};

        environment = window.location.hostname;

        switch (environment) {
            case 'localhost':
                data = {
                    environment: 'development',
                    "ms-main-url": 'http://localhost:3001',
                    "SM_PROJECT_TEMPLATE_ID": 5066554783098756,
                };
                break;
            case 'ms-app-ui-dot-scheduleconnector-dev.appspot-preview.com':
                data = {
                    environment: 'production',
                    "ms-main-url": 'https://ms-main-dot-scheduleconnector-dev.appspot-preview.com',
                    "SM_PROJECT_TEMPLATE_ID": 5066554783098756,
                };
                break;

            case 'ms-app-ui-dot-scheduleconnector-qa.appspot-preview.com':
                data = {
                    environment: 'production',
                    "ms-main-url": 'https://ms-main-dot-scheduleconnector-qa.appspot-preview.com',
                    "SM_PROJECT_TEMPLATE_ID": 5066554783098756,
                };
                break;

            default:
                data = {
                    environment: 'production',
                    "ms-main-url": 'https://ms-main-dot-scheduleconnector-dev.appspot-preview.com',
                    "SM_PROJECT_TEMPLATE_ID": 5066554783098756,
                };
        }

        return data[value];
    }
}
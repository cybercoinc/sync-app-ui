export class Config {
    public static getEnvironmentVariable(value) {
        let environment: string;
        let data = {};

        environment = window.location.hostname;

        switch (environment) {
            case 'localhost':
                data = {
                    "ms-main-url": 'http://localhost:3001',
                    "SM_PROJECT_TEMPLATE_ID": 5066554783098756,
                };
                break;
            case 'ms-app-ui-dot-scheduleconnector-dev.appspot.com':
                data = {
                    "ms-main-url": 'https://scheduleconnector-dev.appspot.com',
                    "SM_PROJECT_TEMPLATE_ID": 5066554783098756,
                };
                break;

            default:
                data = {
                    "ms-main-url": 'https://scheduleconnector-dev.appspot.com',
                    "SM_PROJECT_TEMPLATE_ID": 5066554783098756,
                };
        }

        return data[value];
    }
}
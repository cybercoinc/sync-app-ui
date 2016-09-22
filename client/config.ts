export class Config {
    public static getEnvironmentVariable(value) {
        let environment: string;
        let data = {};

        environment = window.location.hostname;

        switch (environment) {
            case 'localhost':
                data = {
                    "ms-main-url": 'http://localhost:3001',
                    "ms-secure-id": 'MsSecureIdGeneratedRandom123@@#',
                };
                break;
            case 'uat.server.com':
                data = {
                    "ms-main-url": 'http://localhost:3001',
                    "ms-secure-id": 'MsSecureIdGeneratedRandom123@@#',
                };
                break;

            default:
                data = {
                    "ms-main-url": 'http://localhost:3001',
                    "ms-secure-id": 'MsSecureIdGeneratedRandom123@@#',
                };
        }

        return data[value];
    }
}
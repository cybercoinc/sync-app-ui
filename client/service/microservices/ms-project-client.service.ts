import {MsClientService} from "./ms-client.service";

export class MsProjectClientService extends MsClientService {
    url = 'http://localhost:3003';

    getActiveProjects(authUserId, authUserSessionId): Promise<[{}]> {
        return this.makeMsCall(
            '/find-where',
            'GET',
            {
                status: 'active',
                user_fk_id: authUserId
            },
            authUserSessionId
        );
    }

    getProcoreProjects(authUserId, authUserSessionId): Promise<[{}]> {
        console.log('getting pr projects...');

        return new Promise<{}>((resolve, reject) => {
            return resolve([
                {
                    id: 1,
                    name: 'Project 1',
                    disabled: false,
                },

                {
                    id: 2,
                    name: 'Project 2',
                    disabled: false,
                },

                {
                    id: 3,
                    name: 'Project 3',
                    disabled: true,
                },
            ])
        });


        // return this.makeMsCall(
        //     '/get-procore-projects',
        //     'GET',
        //     {
        //         status: 'active', // todo
        //         user_id: authUserId
        //     },
        //     authUserSessionId
        // );
    }

}

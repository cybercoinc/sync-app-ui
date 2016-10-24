import {Routes, RouterModule} from '@angular/router';

import {EditProjectComponent} from './edit-project.component';
import {PipePublicTodoComponent} from './components/pipe-public-todo/pipe-public-todo.component';
import {PipePrivateTodoComponent} from './components/pipe-private-todo/pipe-private-todo.component';
import {SmartsheetConnectionPublicComponent} from './components/pipe-public-todo/smartsheet-connection-public/smartsheet-connection-public.component';
import {SettingsPublicComponent} from './components/pipe-public-todo/settings-public/settings-public.component';

import {AuthService} from 'client/service/auth.service';

export const routes: Routes = [
    {
        path: 'projects/:project_id/edit-project',
        component: EditProjectComponent,
        resolve: {
            authUser: AuthService
        },
        children: [
            {
                path: '',
                redirectTo: 'pipe-public-todo'
            },

            {
                path: 'pipe-private-todo',
                component: PipePrivateTodoComponent
            },

            {
                path: 'pipe-public-todo',
                component: PipePublicTodoComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'smartsheet-connection-public',
                    },

                    {
                        path: 'smartsheet-connection-public',
                        component: SmartsheetConnectionPublicComponent,
                    },

                    {
                        path: 'settings-public',
                        component: SettingsPublicComponent,
                    },


                ]
            },
        ]
    },
];

export const editProjectRouting = RouterModule.forChild(routes);
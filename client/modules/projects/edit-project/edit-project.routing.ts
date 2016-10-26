import {Routes, RouterModule} from '@angular/router';

import {EditProjectComponent} from './edit-project.component';

import {PipePublicTodoComponent} from './components/pipe-public-todo/pipe-public-todo.component';
import {PipePrivateTodoComponent} from './components/pipe-private-todo/pipe-private-todo.component';

import {SmartsheetConnectionPublicComponent} from './components/pipe-public-todo/smartsheet-connection-public.component';
import {PipeSettingsPublicComponent} from './components/pipe-public-todo/pipe-settings-public.component';

import {SmartsheetConnectionPrivateComponent} from './components/pipe-private-todo/smartsheet-connection-private.component';
import {PipeSettingsPrivateComponent} from './components/pipe-private-todo/pipe-settings-private.component';

import {AuthService} from 'client/service/auth.service';
import {PipeConnectionService} from 'client/service/pipe-connection.service';

export const routes: Routes = [
    {
        path: 'projects/:project_id/edit-project',
        component: EditProjectComponent,
        resolve: {
            authUser: AuthService,
            project: PipeConnectionService
        },
        children: [
            {
                path: '',
                redirectTo: 'pipe-public-todo'
            },

            {
                path: 'pipe-private-todo',
                component: PipePrivateTodoComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'smartsheet-connection-private'
                    },

                    {
                        path: 'smartsheet-connection-private',
                        component: SmartsheetConnectionPrivateComponent
                    },

                    {
                        path: 'settings-private',
                        component: PipeSettingsPrivateComponent,
                    },
                ]
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
                        component: PipeSettingsPublicComponent,
                    },
                ]
            },
        ]
    },
];

export const editProjectRouting = RouterModule.forChild(routes);
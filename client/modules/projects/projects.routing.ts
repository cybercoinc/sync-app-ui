import {Routes, RouterModule} from '@angular/router';

import {AuthService} from 'client/service/auth.service';
import {PipeConnectionService} from 'client/service/pipe-connection.service';
import {AuthGuardService} from 'client/service/auth-guard.service';

import {IndexComponent} from './index/index.component';

import {SyncSessionsComponent} from './sync-sessions/sync-sessions.component';
import {SyncSessionsPipePublicTodoComponent} from './sync-sessions/components/pipe-public-todo/pipe-public-todo.component';
import {SyncSessionsPipePrivateTodoComponent} from './sync-sessions/components/pipe-private-todo/pipe-private-todo.component';

import {ItemChangesComponent} from './sync-sessions/item-changes/item-changes.component';
import {CreateProjectComponent} from './create-project/create-project.component';

import {EditProjectComponent} from './edit-project/edit-project.component';
import {PipePrivateTodoComponent} from './edit-project/components/pipe-private-todo/pipe-private-todo.component';
import {SmartsheetConnectionPrivateComponent} from './edit-project/components/pipe-private-todo/smartsheet-connection-private.component';
import {PipeSettingsPrivateComponent} from './edit-project/components/pipe-private-todo/pipe-settings-private.component';
import {PipePublicTodoComponent} from './edit-project/components/pipe-public-todo/pipe-public-todo.component';
import {SmartsheetConnectionPublicComponent} from './edit-project/components/pipe-public-todo/smartsheet-connection-public.component';
import {PipeSettingsPublicComponent} from './edit-project/components/pipe-public-todo/pipe-settings-public.component';

export const routes: Routes = [
    {
        path: 'projects',
        resolve: {
            authUser: AuthService
        },
        canActivate: [AuthGuardService],
        children: [
            {
                path: '',
                component: IndexComponent,
            },

            {
                path: 'create-project',
                component: CreateProjectComponent,
            },

            {
                path: ':project_id/sync-sessions',
                component: SyncSessionsComponent,
                resolve: {
                    project: PipeConnectionService
                },
                children: [
                    {
                        path: '',
                        redirectTo: 'pipe-public-todos',
                    },

                    {
                        path: 'pipe-public-todos',
                        component: SyncSessionsPipePublicTodoComponent
                    },

                    {
                        path: 'pipe-private-todos',
                        component: SyncSessionsPipePrivateTodoComponent
                    },

                    {
                        path: 'item-changes/:sync_session_id',
                        component: ItemChangesComponent
                    },

                ]
            },

            {
                path: ':project_id/edit-project',
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

            // {
            //     path: 'sync-sessions',
            //     children: [
            //         {
            //             path: ':project_id',
            //             children: [
            //                 {
            //                     path: '',
            //                     component: SyncSessionsComponent,
            //                 },
            //                 {
            //                     path: 'item-changes/:sync_session_id',
            //                     component: ItemChangesComponent
            //                 }
            //             ]
            //         }
            //     ]
            // },
        ],
    },
];

export const routing = RouterModule.forChild(routes);
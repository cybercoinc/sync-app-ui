import {Routes, RouterModule} from '@angular/router';

import {AuthService} from 'client/service/auth.service';
import {PipeConnectionService} from 'client/service/pipe-connection.service';
import {AuthGuardService} from 'client/service/auth-guard.service';

import {IndexComponent} from './index/index.component';

import {SyncSessionsComponent} from './sync-sessions/sync-sessions.component';
import {CreateProjectComponent} from './create-project/create-project.component';

import {EditProjectComponent} from './edit-project/edit-project.component';
import {PipePrivateTodoComponent} from './edit-project/components/pipe-private-todo/pipe-private-todo.component';
import {SmartsheetConnectionPrivateComponent} from './edit-project/components/pipe-private-todo/smartsheet-connection-private.component';
import {PipeSettingsPrivateComponent} from './edit-project/components/pipe-private-todo/pipe-settings-private.component';
import {PipePublicTodoComponent} from './edit-project/components/pipe-public-todo/pipe-public-todo.component';
import {SmartsheetConnectionPublicComponent} from './edit-project/components/pipe-public-todo/smartsheet-connection-public.component';
import {PipeSettingsPublicComponent} from './edit-project/components/pipe-public-todo/pipe-settings-public.component';

import {SyncSessionsListComponent} from './sync-sessions/list/sync-sessions-list.component';
import {ProjectSettingsComponent} from './edit-project/components/project-settings/project-settings.component';
import {DeleteProjectComponent} from "./delete-project/delete-project.component";

import {PipeTasksTodoComponent} from "./edit-project/components/pipe-tasks/pipe-tasks.component";
import {SmartsheetConnectionTasksComponent} from "./edit-project/components/pipe-tasks/smartsheet-connection-tasks.component";
import {TasksSettingsComponent} from "./edit-project/components/pipe-tasks/tasks-settings/tasks-settings.component";
import {AuthBootstrapService} from "client/service/resolvers/auth-bootstrap.service";
import {ProjectGuardService} from "../../service/project-guard.service";

export const routes: Routes = [
    {
        path: 'projects',
        resolve: {
            bootstrap: AuthBootstrapService,
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
                path: ':project_id/delete-project',
                component: DeleteProjectComponent,
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
                        redirectTo: 'public_todos',
                        pathMatch: 'full'
                    },

                    {
                        path: ':pipe_type',
                        component: SyncSessionsListComponent
                    },
                ],
            },

            {
                path: ':project_id/edit-project',
                component: EditProjectComponent,
                resolve: {
                    project: PipeConnectionService
                },
                canActivate: [ProjectGuardService],
                children: [
                    {
                        path: '',
                        redirectTo: 'pipe-public-todo',
                        pathMatch: 'full'
                    },

                    {
                        path: 'pipe-private-todo',
                        component: PipePrivateTodoComponent,
                        children: [
                            {
                                path: '',
                                redirectTo: 'smartsheet-connection-private',
                                pathMatch: 'full'
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
                                pathMatch: 'full'
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
                    {
                        path: 'pipe-tasks',
                        component: PipeTasksTodoComponent,
                        children: [
                            {
                                path: '',
                                redirectTo: 'smartsheet-connection',
                                pathMatch: 'full'
                            },

                            {
                                path: 'smartsheet-connection',
                                component: SmartsheetConnectionTasksComponent,
                            },

                            {
                                path: 'settings',
                                component: TasksSettingsComponent,
                            },
                        ]
                    },

                    {
                        path: 'settings',
                        component: ProjectSettingsComponent
                    },
                ]
            },
        ],
    },
];

export const routing = RouterModule.forChild(routes);
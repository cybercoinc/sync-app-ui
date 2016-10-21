import {Routes, RouterModule} from '@angular/router';

import {AuthService} from 'client/service/auth.service';
import {AuthGuardService} from 'client/service/auth-guard.service';

import {IndexComponent} from './index/index.component';
import {SyncSessionsComponent} from './sync-sessions/sync-sessions.component';
import {ItemChangesComponent} from './sync-sessions/item-changes/item-changes.component';
import {CreateProjectComponent} from './create-project/create-project.component';

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
                path: 'sync-sessions',
                children: [
                    {
                        path: ':project_id',
                        children: [
                            {
                                path: '',
                                component: SyncSessionsComponent,
                            },
                            {
                                path: 'item-changes/:sync_session_id',
                                component: ItemChangesComponent
                            }
                        ]
                    }
                ]
            },
        ],
    },
];

export const routing = RouterModule.forChild(routes);
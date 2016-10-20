import {Routes, RouterModule} from '@angular/router';

import {AuthService} from 'client/service/auth.service';
import {AuthGuardService} from 'client/service/auth-guard.service';

import {IndexComponent} from './index/index.component';
import {SyncSessionsComponent} from './sync-sessions/sync-sessions.component';
import {ItemChangesComponent} from './sync-sessions/item-changes/item-changes.component';

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

            // {
            //     path: 'wizard',
            //     children: [
            //         {
            //             path: 'choose-procore-project',
            //             component: ChooseProcoreProjectComponent
            //         },
            //
            //         {
            //             path: 'choose-smartsheet-sheet',
            //             children: [
            //                 {
            //                     path: ':id',
            //                     component: ChooseSmartsheetSheetComponent
            //                 }
            //             ]
            //         },
            //
            //         {
            //             path: 'match-sheet-columns',
            //             children: [
            //                 {
            //                     path: ':id',
            //                     component: MatchSheetColumnsComponent
            //                 }
            //             ]
            //         },
            //
            //
            //         {
            //             path: 'set-working-week-days',
            //             children: [
            //                 {
            //                     path: ':id',
            //                     component: SetWorkingWeekDaysComponent
            //                 }
            //             ]
            //         },
            //     ]
            // }
        ],
    },
];

export const routing = RouterModule.forChild(routes);
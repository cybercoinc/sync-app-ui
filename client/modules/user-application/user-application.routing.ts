import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from 'client/modules/user-application/home/home.component';
import {ConnectionComponent} from 'client/modules/user-application/connection/connection.component';
import {UserApplicationComponent} from 'client/modules/user-application/user-application.component';
import {ProjectsComponent} from 'client/modules/user-application/projects/projects.component';


import {IndexComponent} from 'client/modules/user-application/projects/index/index.component';
import {SyncSessionsComponent} from 'client/modules/user-application/projects/sync-sessions/sync-sessions.component';
import {ItemChangesComponent} from 'client/modules/user-application/projects/sync-sessions/item-changes/item-changes.component';
import {ChooseProcoreProjectComponent} from 'client/modules/user-application/projects/project-wizard/choose-procore-project/choose-procore-project.component';
import {ChooseSmartsheetSheetComponent} from 'client/modules/user-application/projects/project-wizard/choose-smartsheet-project/choose-smartsheet-sheet.component';
import {MatchSheetColumnsComponent} from 'client/modules/user-application/projects/project-wizard/match-sheet-columns/match-sheet-columns.component';
import {SetWorkingWeekDaysComponent} from 'client/modules/user-application/projects/project-wizard/set-working-week-days/set-working-week-days.component';

import {AuthService} from 'client/service/auth.service';
import {AuthGuardService} from 'client/service/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        component: UserApplicationComponent,
        resolve: {
            authUser: AuthService
        },
        canActivate: [AuthGuardService],
        children: [
            {
                path: 'home',
                component: HomeComponent
            },

            {
                path: 'connection',
                component: ConnectionComponent
            },

            {
                path: 'projects',
                component: ProjectsComponent,
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

                    {
                        path: 'wizard',
                        children: [
                            {
                                path: 'choose-procore-project',
                                component: ChooseProcoreProjectComponent
                            },

                            {
                                path: 'choose-smartsheet-sheet',
                                children: [
                                    {
                                        path: ':id',
                                        component: ChooseSmartsheetSheetComponent
                                    }
                                ]
                            },

                            {
                                path: 'match-sheet-columns',
                                children: [
                                    {
                                        path: ':id',
                                        component: MatchSheetColumnsComponent
                                    }
                                ]
                            },


                            {
                                path: 'set-working-week-days',
                                children: [
                                    {
                                        path: ':id',
                                        component: SetWorkingWeekDaysComponent
                                    }
                                ]
                            },
                        ]
                    }
                ]
            }
        ]
    },
];

export const routing = RouterModule.forChild(routes);
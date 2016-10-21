import {Routes, RouterModule} from '@angular/router';

import {AuthService} from 'client/service/auth.service';
import {AuthGuardService} from 'client/service/auth-guard.service';

import {EditProjectComponent} from './edit-project.component';

export const routes: Routes = [
    {
        path: 'testing',
        component: EditProjectComponent
    },
    // {
    //     path: ':project_id',
    //     resolve: {
    //         authUser: AuthService
    //     },
    //     canActivate: [AuthGuardService],
    //     children: [
    //         {
    //             path: 'edit-project',
    //             component: EditProjectComponent,
    //         }
    //     ],
    // },
];

export const routing = RouterModule.forChild(routes);
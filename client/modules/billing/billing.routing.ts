import {Routes, RouterModule} from '@angular/router';
import {AuthService} from 'client/service/auth.service';
import {AuthGuardService} from 'client/service/auth-guard.service';

import {InvoicesComponent} from './invoices/invoices.component';
import {LicensesComponent} from './licenses/licenses.component';



export const routes: Routes = [
    {
        path: 'billing',
        resolve: {
            authUser: AuthService
        },
        canActivate: [AuthGuardService],
        children: [
            {
                path: 'licenses',
                component: LicensesComponent,
            },

            {
                path: 'invoices',
                component: InvoicesComponent,
            },

        ],
    }
];

export const routing = RouterModule.forChild(routes);
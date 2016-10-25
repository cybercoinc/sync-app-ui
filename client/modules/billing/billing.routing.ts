import {Routes, RouterModule} from '@angular/router';
import {AuthService} from 'client/service/auth.service';
import {AuthGuardService} from 'client/service/auth-guard.service';

import {BillingComponent} from './billing.component';
import {InvoicesComponent} from './invoices/invoices.component';
import {LicensesComponent} from './licenses/licenses.component';



export const routes: Routes = [
    {
        component: BillingComponent,
        path: 'billing',
        resolve: {
            authUser: AuthService
        },
        canActivate: [AuthGuardService],
        children: [
            {
                path: '',
                redirectTo: 'licenses'
            },
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
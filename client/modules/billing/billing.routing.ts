import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from 'client/service/auth-guard.service';
import {BillingComponent} from './billing.component';
import {InvoicesComponent} from './invoices/invoices.component';
import {LicensesComponent} from './licenses/licenses.component';
import {InfoComponent} from "./info/Info.component";
import {BootstrapService} from "client/service/bootstrap.service";



export const routes: Routes = [
    {
        component: BillingComponent,
        path: 'billing',
        resolve: {
            bootstrap: BootstrapService
        },
        canActivate: [AuthGuardService],
        children: [
            {
                path: '',
                redirectTo: 'licenses',
                pathMatch: 'prefix'
            },
            {
                path: 'info',
                component: InfoComponent,
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
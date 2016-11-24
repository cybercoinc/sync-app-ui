import {Routes, RouterModule} from '@angular/router';
import {AuthService} from 'client/service/auth.service';
import {AuthGuardService} from 'client/service/auth-guard.service';

import {CompaniesComponent} from './companies.component';
import {CompanySettingsComponent} from './settings/settings.component';




export const routes: Routes = [
    {
        component: CompaniesComponent,
        path: 'companies',
        resolve: {
            authUser: AuthService
        },
        canActivate: [AuthGuardService],
        children: [
            {
                path: '',
                redirectTo: 'settings'
            },
            {
                path: 'settings',
                component: CompanySettingsComponent,
            },
        ],
    }
];

export const routing = RouterModule.forChild(routes);
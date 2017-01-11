import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from 'client/service/auth-guard.service';
import {CompaniesComponent} from './companies.component';
import {CompanySettingsComponent} from './settings/settings.component';
import {AuthBootstrapService} from "client/service/resolvers/auth-bootstrap.service";

export const routes: Routes = [
    {
        component: CompaniesComponent,
        path: 'companies',
        resolve: {
            bootstrap: AuthBootstrapService
        },
        canActivate: [AuthGuardService],
        children: [
            {
                path: '',
                redirectTo: 'settings',
                pathMatch: 'prefix'
            },
            {
                path: 'settings',
                component: CompanySettingsComponent,
            },
        ],
    }
];

export const routing = RouterModule.forChild(routes);
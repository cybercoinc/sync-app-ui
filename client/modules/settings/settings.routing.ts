import {Routes, RouterModule} from '@angular/router';
import {SettingsComponent} from './settings.component';
import {AuthBootstrapService} from "client/service/resolvers/auth-bootstrap.service";
import {AuthGuardService} from "../../service/auth-guard.service";
import {CompanyComponent} from "./company/company.component";
import {UserComponent} from "./user/user.component";

export const routes: Routes = [
    {
        component: SettingsComponent,
        path: 'settings',
        resolve: {
            bootstrap: AuthBootstrapService
        },
        canActivate: [AuthGuardService],
        children: [
            {
                path: '',
                redirectTo: 'company',
                pathMatch: 'prefix'
            },
            {
                path: 'company',
                component: CompanyComponent,
            },
            {
                path: 'user',
                component: UserComponent,
            }
        ],
    }
];

export const routing = RouterModule.forChild(routes);
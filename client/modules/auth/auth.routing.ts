import {Routes, RouterModule} from '@angular/router';
import {AuthDefaultComponent} from './auth-default/auth-default.component';
import {AuthProcoreComponent} from './auth-procore/auth-procore.component';
import {AuthComponent} from './auth.component';
import {GuestBootstrapService} from "client/service/resolvers/guest-bootstrap.service";
import {ChooseCompanyComponent} from "./choose-company/choose-company.component";

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        resolve: {
            guest: GuestBootstrapService
        },
        children: [
            {
                path: '',
                redirectTo: 'default',
                pathMatch: 'full'
            },
            {
                path: 'default',
                component: AuthDefaultComponent
            },
            {
                path: 'procore',
                component: AuthProcoreComponent
            },
            {
                path: 'choose-company',
                component: ChooseCompanyComponent
            },
        ]
    },
];

export const routing = RouterModule.forChild(routes);
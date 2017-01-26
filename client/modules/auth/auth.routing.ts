import {Routes, RouterModule} from '@angular/router';
import {AuthDefaultComponent} from './auth-default/auth-default.component';
import {AuthProcoreComponent} from './auth-procore/auth-procore.component';
import {AuthComponent} from './auth.component';
import {GuestBootstrapService} from "client/service/resolvers/guest-bootstrap.service";
import {ChooseCompanyComponent} from "./choose-company/choose-company.component";
import {AuthBootstrapService} from "client/service/resolvers/auth-bootstrap.service";

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {
                path: '',
                redirectTo: 'default',
                pathMatch: 'full'
            },
            {
                path: 'default',
                component: AuthDefaultComponent,
                resolve: {
                    guest: GuestBootstrapService
                }
            },
            {
                path: 'procore',
                component: AuthProcoreComponent,
                resolve: {
                    guest: GuestBootstrapService
                }
            },
            {
                path: 'choose-company',
                component: ChooseCompanyComponent,
                resolve: {
                    guest: GuestBootstrapService
                    // bootstrap: AuthBootstrapService // todo think something with guest+auth resolver
                }
            },
        ]
    },
];

export const routing = RouterModule.forChild(routes);
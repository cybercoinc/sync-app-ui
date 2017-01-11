import {Routes, RouterModule} from '@angular/router';
import {AuthDefaultComponent} from './auth-default/auth-default.component';
import {AuthProcoreComponent} from './auth-procore/auth-procore.component';
import {AuthComponent} from './auth.component';
import {GuestBootstrapService} from "client/service/resolvers/guest-bootstrap.service";

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
                redirectTo: 'default'
            },
            {
                path: 'default',
                component: AuthDefaultComponent
            },
            {
                path: 'procore',
                component: AuthProcoreComponent
            },
        ]
    },
];

export const routing = RouterModule.forChild(routes);
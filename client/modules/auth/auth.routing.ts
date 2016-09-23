import {Routes, RouterModule} from '@angular/router';
import {AuthDefaultComponent} from './auth-default/auth-default.component';
import {AuthProcoreComponent} from './auth-procore/auth-procore.component';
import {AuthComponent} from './auth.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {
                path: '',
                component: AuthDefaultComponent
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
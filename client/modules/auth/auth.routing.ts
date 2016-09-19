import {Routes, RouterModule} from '@angular/router';
import {AuthDefaultComponent} from './auth-default/auth-default.component';
import {AuthComponent} from './auth.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {
                path: 'default',
                component: AuthDefaultComponent
            }
        ]
    },
];

export const routing = RouterModule.forChild(routes);
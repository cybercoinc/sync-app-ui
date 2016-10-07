import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from 'client/modules/user-application/home/home.component';
import {ConnectionComponent} from 'client/modules/user-application/connection/connection.component';
import {UserApplicationComponent} from 'client/modules/user-application/user-application.component';

export const routes: Routes = [
    {
        path: '',
        component: UserApplicationComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'connection',
                component: ConnectionComponent
            },

        ]
    },
];

export const routing = RouterModule.forChild(routes);
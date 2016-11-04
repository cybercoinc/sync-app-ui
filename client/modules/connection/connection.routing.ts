import {Routes, RouterModule} from '@angular/router';

import {ConnectionComponent} from './connection.component';
import {AuthService} from "client/service/auth.service";

export const routes: Routes = [
    {
        path: 'connection',
        component: ConnectionComponent,
        resolve: {
            authUser: AuthService
        },
    },
];

export const routing = RouterModule.forChild(routes);
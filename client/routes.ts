import {Routes, RouterModule} from '@angular/router';
import {AuthService} from "client/service/auth.service";

export const routes: Routes = [
    {
        path: '',
        resolve: {
            authUser: AuthService
        },
        redirectTo: 'projects',
        pathMatch: 'full'
    },
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
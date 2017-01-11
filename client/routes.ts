import {Routes, RouterModule} from '@angular/router';
import {AuthBootstrapService} from "client/service/resolvers/auth-bootstrap.service";

export const routes: Routes = [
    {
        path: '',
        resolve: {
            bootstrap: AuthBootstrapService,
        },
        redirectTo: 'projects',
        pathMatch: 'full'
    },
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
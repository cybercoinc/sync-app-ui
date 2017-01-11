import {Routes, RouterModule} from '@angular/router';
import {ConnectionComponent} from './connection.component';
import {AuthBootstrapService} from "client/service/resolvers/auth-bootstrap.service";

export const routes: Routes = [
    {
        path: 'connection',
        component: ConnectionComponent,
        resolve: {
            bootstrap: AuthBootstrapService
        },
    },
];

export const routing = RouterModule.forChild(routes);
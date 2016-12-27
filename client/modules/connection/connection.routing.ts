import {Routes, RouterModule} from '@angular/router';
import {ConnectionComponent} from './connection.component';
import {BootstrapService} from "client/service/bootstrap.service";

export const routes: Routes = [
    {
        path: 'connection',
        component: ConnectionComponent,
        resolve: {
            bootstrap: BootstrapService
        },
    },
];

export const routing = RouterModule.forChild(routes);
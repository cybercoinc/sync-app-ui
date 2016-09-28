import {Routes, RouterModule} from '@angular/router';
import {ConnectionComponent} from './connection.component';

export const routes: Routes = [
    {
        path: 'connection',
        component: ConnectionComponent
    }
];

export const routing = RouterModule.forChild(routes);
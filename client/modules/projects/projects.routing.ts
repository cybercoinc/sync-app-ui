import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {ConnectComponent} from './connect/connect.component';

export const routes: Routes = [
    {path: 'projects', component: IndexComponent, pathMatch: "full"},
    {path: 'projects/connect', component: ConnectComponent, pathMatch: "full"},
];

export const routing = RouterModule.forChild(routes);
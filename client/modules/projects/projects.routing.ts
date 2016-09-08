import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';

export const routes: Routes = [
    {path: 'projects', component: IndexComponent, pathMatch: "full"},
];

export const routing = RouterModule.forChild(routes);
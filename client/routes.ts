import {Routes, RouterModule} from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'projects', pathMatch: 'full'},
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
import {Routes, RouterModule} from '@angular/router';
import {AuthDefaultComponent} from './auth-default/auth-default.component';

export const routes: Routes = [

    {path: 'auth/default', component: AuthDefaultComponent, pathMatch: "full"},

];

export const routing = RouterModule.forChild(routes);
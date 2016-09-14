import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {ConnectComponent} from './connect/connect.component';
import {AuthService} from '../../service/auth.service';

export const routes: Routes = [
    {
        path: 'projects', component: IndexComponent, pathMatch: "full", component: IndexComponent,
        resolve: {
            authUser: AuthService
        }
    },
    {path: 'projects/connect', component: ConnectComponent, pathMatch: "full"},

];

export const routing = RouterModule.forChild(routes);
import {Routes, RouterModule} from '@angular/router';
import {AuthService} from './service/auth.service';

import {IndexComponent} from './modules/projects/index/index.component';

export const routes: Routes = [
    {path: '', redirectTo: 'projects', pathMatch: 'full'},

    // {
    //     path: 'projects',
    //     component: IndexComponent,
    //     resolve: {
    //         authUser: AuthService
    //     }
    // }

];

export const routing = RouterModule.forRoot(routes, {useHash: true});
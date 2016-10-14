import {Routes, RouterModule} from '@angular/router';
import {SandboxComponent} from './sandbox.component';
import {AuthService} from 'client/service/auth.service';

export const routes: Routes = [
    {
        path: 'sandbox',
        component: SandboxComponent,
        resolve: {
            authUser: AuthService
        },
    },
];

export const routing = RouterModule.forChild(routes);
import {Routes, RouterModule} from '@angular/router';
import {SandboxComponent} from './modules/sandbox/sandbox.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full'
    },

    {
        path: 'sandbox',
        component: SandboxComponent,
        pathMatch: 'full'
    },
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
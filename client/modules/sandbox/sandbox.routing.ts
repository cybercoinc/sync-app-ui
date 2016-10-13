import {Routes, RouterModule} from '@angular/router';
import {SandboxComponent} from './sandbox.component'

export const routes: Routes = [
    {
        path: '',
        component: SandboxComponent,
    },
];

export const routing = RouterModule.forChild(routes);
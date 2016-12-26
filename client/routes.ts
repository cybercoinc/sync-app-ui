import {Routes, RouterModule} from '@angular/router';
import {AuthService} from "client/service/auth.service";
import {ConfigService} from "client/service/config.service";
import {BootstrapService} from "client/service/bootstrap.service";

export const routes: Routes = [
    {
        path: '',
        resolve: {
            bootstrap: BootstrapService,
        },
        redirectTo: 'projects',
        pathMatch: 'full'
    },
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
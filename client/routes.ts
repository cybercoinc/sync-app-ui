import {Routes, RouterModule} from '@angular/router';
import {AuthService} from "client/service/auth.service";
import {AppComponent} from "./app.component";

export const routes: Routes = [
    {
        path: '',
        resolve: {
            authUser: AuthService
        },
        redirectTo: 'projects',
        pathMatch: 'full'
    },
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
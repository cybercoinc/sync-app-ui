import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {ProjectWizardComponent} from './project-wizard/project-wizard.component';
import {AuthService} from '../../service/auth.service'; // todo AuthService should be attached to all components

export const routes: Routes = [
    {
        path: 'projects',
        component: IndexComponent,
        pathMatch: "full",
        component: IndexComponent,
        resolve: {
            authUser: AuthService
        }
    },

    {
        path: 'projects/wizard',
        component: ProjectWizardComponent,
        pathMatch: "full"
    },

];

export const routing = RouterModule.forChild(routes);
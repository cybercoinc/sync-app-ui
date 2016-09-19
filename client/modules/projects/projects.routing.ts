import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {ProjectWizardComponent} from './project-wizard/project-wizard.component';
import {ProjectsComponent} from './projects.component';
import {AuthService} from '../../service/auth.service'; // todo AuthService should be attached to all components

export const routes: Routes = [
    {
        path: 'projects',
        component: ProjectsComponent,
        resolve: {
            authUser: AuthService
        },
        children: [
            {
                path: '',
                component: IndexComponent,
            },
            {
                path: 'wizard',
                component: ProjectWizardComponent
            }
        ]
    },

];

export const routing = RouterModule.forChild(routes);
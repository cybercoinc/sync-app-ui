import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {ProjectWizardComponent} from './project-wizard/project-wizard.component';
import {ProjectsComponent} from './projects.component';
import {ChooseProcoreProjectComponent} from './project-wizard/choose-procore-project/choose-procore-project.component';
import {AuthService} from '../../service/auth.service';
import {AuthGuardService} from 'client/service/auth-guard.service';

export const routes: Routes = [
    {
        path: 'projects',
        component: ProjectsComponent,
        resolve: {
            authUser: AuthService
        },
        canActivate: [AuthGuardService],
        children: [
            {
                path: '',
                component: IndexComponent,
            },
            {
                path: 'wizard',
                children: [
                    {
                        path: '',
                        component: ProjectWizardComponent,
                        redirectTo: 'choose-procore-project'
                    },
                    {
                        path: 'choose-procore-project',
                        component: ChooseProcoreProjectComponent
                    }
                ]
            }
        ]
    },

];

export const routing = RouterModule.forChild(routes);
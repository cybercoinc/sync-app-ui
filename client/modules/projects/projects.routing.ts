import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {ProjectsComponent} from './projects.component';
import {ChooseProcoreProjectComponent} from './project-wizard/choose-procore-project/choose-procore-project.component';
import {AuthService} from '../../service/auth.service';
import {AuthGuardService} from 'client/service/auth-guard.service';
import {ChooseSmartsheetSheetComponent} from "./project-wizard/choose-smartsheet-project/choose-smartsheet-sheet.component";

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
                        path: 'choose-procore-project',
                        component: ChooseProcoreProjectComponent
                    },
                    {
                        path: 'choose-smartsheet-sheet',
                        children: [
                            {
                                path: ':id',
                                component: ChooseSmartsheetSheetComponent
                            }
                        ]
                    },
                    {
                        path: 'test',
                        children: [
                            {
                                path: '',
                                component: ChooseSmartsheetSheetComponent
                            }
                        ]
                    }

                ]
            }

        ]
    },

];

export const routing = RouterModule.forChild(routes);
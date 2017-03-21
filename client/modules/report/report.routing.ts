import {Routes, RouterModule} from '@angular/router';
import {ReportComponent} from './index/report.component';
import {AuthBootstrapService} from "client/service/resolvers/auth-bootstrap.service";
import {ReportResultComponent} from "./report-result/report-result.component";

export const routes: Routes = [
    {
        path: 'report',
        resolve: {
            bootstrap: AuthBootstrapService
        },
        children: [
            {
                path: '',
                component: ReportComponent,
            },
            {
                path: ':reportId',
                component: ReportResultComponent,
            }
        ]

    }
];

export const routing = RouterModule.forChild(routes);
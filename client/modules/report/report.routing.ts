import {Routes, RouterModule} from '@angular/router';
import {UtilizationReportComponent} from './utilization-report/report.component';
import {AuthBootstrapService} from "client/service/resolvers/auth-bootstrap.service";
import {ReportResultComponent} from "./report-result/report-result.component";
import {ReportsComponent} from "./index/reports.component";

export const routes: Routes = [
    {
        path: 'reports',
        resolve: {
            bootstrap: AuthBootstrapService
        },
        children: [
            {
                path: '',
                component: ReportsComponent,
            },
            {
                path: ':reportId',
                component: ReportResultComponent,
            }
        ]

    },
    {
        path: 'utilization-report',
        resolve: {
            bootstrap: AuthBootstrapService
        },
        children: [
            {
                path: '',
                component: UtilizationReportComponent,
            },
            {
                path: ':reportId',
                component: ReportResultComponent,
            }
        ]
    }
];

export const routing = RouterModule.forChild(routes);
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {routing} from './report.routing';

import {UtilizationReportComponent} from './utilization-report/report.component';
import {ReportResultComponent} from "./report-result/report-result.component";
import {ReportsComponent} from "./index/reports.component";

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        routing
    ],
    declarations: [
        ReportsComponent,
        UtilizationReportComponent,
        ReportResultComponent
    ],
    bootstrap: [UtilizationReportComponent, ReportsComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class ReportModule {
}
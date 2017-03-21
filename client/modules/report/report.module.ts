import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {routing} from './report.routing';

import {ReportComponent} from './index/report.component';
import {ReportResultComponent} from "./report-result/report-result.component";

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        routing
    ],
    declarations: [
        ReportComponent,
        ReportResultComponent
    ],
    bootstrap: [ReportComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class ReportModule {
}
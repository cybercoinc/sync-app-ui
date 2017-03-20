import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {BillingComponent} from './billing.component';
import {InvoicesComponent} from './invoices/invoices.component';
import {LicensesComponent} from './licenses/licenses.component';
import {InfoComponent} from "./info/Info.component";
import {CompanyComponent} from "./company/company.component";

import {routing} from './billing.routing';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {Dialog} from "../paytrace/dialog.component";

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        routing
    ],
    exports: [],
    declarations: [
        BillingComponent,
        InvoicesComponent,
        LicensesComponent,
        InfoComponent,
        CompanyComponent,
        Dialog
    ],
    bootstrap: [BillingComponent],
    entryComponents: [Dialog],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class BillingModule {
}
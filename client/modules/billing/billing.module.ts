import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {BillingComponent} from './billing.component';
import {InvoicesComponent} from './invoices/invoices.component';
import {LicensesComponent} from './licenses/licenses.component';
import {LicenseTableHeaderComponent} from './licenses/license-table-header.component';
import {LicenseTableRowComponent} from './licenses/license-table-row.component';

import {routing} from './billing.routing';

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,
        routing,
    ],
    exports: [],
    declarations: [
        BillingComponent,
        InvoicesComponent,
        LicensesComponent,
        LicenseTableHeaderComponent,
        LicenseTableRowComponent,
    ],
    bootstrap: [BillingComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class BillingModule {
}
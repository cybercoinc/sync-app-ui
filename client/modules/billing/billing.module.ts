import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {BillingComponent} from './billing.component';
import {InvoicesComponent} from './invoices/invoices.component';
import {LicensesComponent} from './licenses/licenses.component';
import {LicenseTableHeaderComponent} from './licenses/license-table-header.component';
import {LicenseTableRowComponent} from './licenses/license-table-row.component';
import {InvoiceCardComponent} from './invoices/invoice-card.component';
import {InfoComponent} from "./info/Info.component";

import {routing} from './billing.routing';
import {FormsModule} from "@angular/forms";
import {Dialog} from "../paytrace/dialog.component";

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,
        FormsModule,
        routing
    ],
    exports: [],
    declarations: [
        BillingComponent,
        InvoicesComponent,
        LicensesComponent,
        InfoComponent,
        LicenseTableHeaderComponent,
        LicenseTableRowComponent,
        InvoiceCardComponent,
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
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {BillingComponent} from './billing.component';
import {InvoicesComponent} from './invoices/invoices.component';
import {LicensesComponent} from './licenses/licenses.component';
import {InfoComponent} from "./info/Info.component";
import {CompanyComponent} from "./company/company.component";
import {CreditCardDialog} from "./info/credit-card-dialog/credit-card.dialog";
import {routing} from './billing.routing';

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
        CreditCardDialog,
        CompanyComponent,
    ],
    bootstrap: [BillingComponent],
    entryComponents: [CreditCardDialog],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class BillingModule {
}
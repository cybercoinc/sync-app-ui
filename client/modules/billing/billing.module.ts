import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {InvoicesComponent} from './invoices/invoices.component';
import {LicensesComponent} from './licenses/licenses.component';
import {routing} from './billing.routing';

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,

        routing,
    ],
    exports: [],
    declarations: [
        InvoicesComponent,
        LicensesComponent
    ],
    bootstrap: [InvoicesComponent, LicensesComponent]
})
export class BillingModule {
}
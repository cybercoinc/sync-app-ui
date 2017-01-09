import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {CompaniesComponent} from './companies.component';
import {CompanySettingsComponent} from './settings/settings.component';
import {CybercoMaterialNg2Module} from "cyberco-material-ng2/cyberco-material-ng2";

import {routing} from './companies.routing';
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,
        FormsModule,
        CybercoMaterialNg2Module,
        routing,
    ],
    exports: [],
    declarations: [
        CompaniesComponent,
        CompanySettingsComponent,

    ],
    bootstrap: [CompaniesComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class CompaniesModule {
}
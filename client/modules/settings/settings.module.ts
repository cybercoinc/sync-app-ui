import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {FormsModule} from "@angular/forms";
import {routing} from './settings.routing';

import {SettingsComponent} from './settings.component';
import {CompanyComponent} from "./company/company.component";
import {UserComponent} from "./user/user.component";
import {CybercoNg2Module} from "../cyberco-ng2/cyberco-ng2.module";

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,
        FormsModule,
        CybercoNg2Module,
        routing,
    ],
    exports: [],
    declarations: [
        SettingsComponent,
        CompanyComponent,
        UserComponent

    ],
    bootstrap: [SettingsComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class SettingsModule {
}
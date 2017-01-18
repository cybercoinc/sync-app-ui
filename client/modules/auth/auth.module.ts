import {NgModule} from '@angular/core';
import {routing} from "./auth.routing";

import {AuthDefaultComponent} from './auth-default/auth-default.component';
import {AuthProcoreComponent} from './auth-procore/auth-procore.component';
import {AuthComponent} from './auth.component';

import {MaterialModule} from '@angular/material';
import {ChooseCompanyComponent} from "./choose-company/choose-company.component";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        routing,
        BrowserModule,
    ],

    exports: [],

    declarations: [
        AuthDefaultComponent,
        AuthProcoreComponent,
        ChooseCompanyComponent,
        AuthComponent
    ],

    bootstrap: [AuthComponent]
})
export class AuthModule {
}
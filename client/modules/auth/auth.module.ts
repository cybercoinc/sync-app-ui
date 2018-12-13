import {NgModule} from '@angular/core';
import {routing} from "./auth.routing";

import {AuthDefaultComponent} from './auth-default/auth-default.component';
import {AuthProcoreComponent} from './auth-procore/auth-procore.component';
import {AuthComponent} from './auth.component';

import {MaterialModule} from '@angular/material';
import {ChooseCompanyComponent} from "./choose-company/choose-company.component";
import {SelectCompanyComponent} from "./select-company/select-company.component";
import {AuthDesktopComponent} from "./auth-desktop/auth-desktop.component";
import {FinalizeDesktopComponent} from "./finalize-desktop/finalize-desktop.component";
import {BrowserModule} from "@angular/platform-browser";
import {AuthService} from "client/service/auth.service";

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        routing,
        BrowserModule,
    ],

    providers: [
        AuthService
    ],

    exports: [],

    declarations: [
        AuthDefaultComponent,
        AuthProcoreComponent,
        ChooseCompanyComponent,
        SelectCompanyComponent,
        AuthDesktopComponent,
        FinalizeDesktopComponent,
        AuthComponent
    ],

    bootstrap: [AuthComponent]
})
export class AuthModule {
}

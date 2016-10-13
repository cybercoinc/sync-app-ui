import {NgModule} from '@angular/core';
import {routing} from "./auth.routing";

import {AuthDefaultComponent} from './auth-default/auth-default.component';
import {AuthProcoreComponent} from './auth-procore/auth-procore.component';
import {AuthComponent} from './auth.component';

import {MaterialModule} from '@angular/material';

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        routing,
    ],

    exports: [],

    declarations: [
        AuthDefaultComponent,
        AuthProcoreComponent,
        AuthComponent
    ],

    bootstrap: [AuthComponent]
})
export class AuthModule {
}
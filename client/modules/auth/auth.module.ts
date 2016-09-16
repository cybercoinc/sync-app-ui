import {NgModule} from '@angular/core';
import {routing} from "./auth.routing";

import {MdCardModule} from '@angular2-material/card';
import {MdButtonModule} from '@angular2-material/button';
import {MdToolbarModule} from '@angular2-material/toolbar';
import {MdIconModule} from '@angular2-material/icon';
import {MdSidenavModule} from '@angular2-material/sidenav';
import {MdListModule} from '@angular2-material/list';

import {AuthDefaultComponent} from './auth-default/auth-default.component';

@NgModule({
    imports: [
        MdCardModule,
        MdButtonModule,
        MdToolbarModule,
        MdIconModule,
        MdSidenavModule,
        MdListModule,

        routing,
    ],

    exports: [],

    declarations: [
        AuthDefaultComponent
    ],

    bootstrap: [AuthDefaultComponent]
})
export class AuthModule {
}
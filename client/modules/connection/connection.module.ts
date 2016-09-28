import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {MdCardModule} from '@angular2-material/card';
import {MdButtonModule} from '@angular2-material/button';
import {MdToolbarModule} from '@angular2-material/toolbar';
import {MdIconModule} from '@angular2-material/icon';
import {MdSidenavModule} from '@angular2-material/sidenav';
import {MdTabsModule} from '@angular2-material/tabs';
import {MdListModule} from '@angular2-material/list';
import {MdRadioModule} from '@angular2-material/radio';
import {MdInputModule} from '@angular2-material/input';

import {routing} from "client/modules/connection/connection.routing";
import {ConnectionComponent} from "client/modules/connection/connection.component";

@NgModule({
    imports: [
        BrowserModule,

        MdCardModule,
        MdButtonModule,
        MdToolbarModule,
        MdIconModule,
        MdSidenavModule,
        MdListModule,
        MdTabsModule,
        MdRadioModule,
        MdInputModule,

        routing,
    ],
    declarations: [
        ConnectionComponent
    ],
    bootstrap: [
        ConnectionComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ConnectionModule {
}
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

import {ChangesLogsComponent} from "client/modules/projects/changes-logs/changes-logs.component";

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

    ],
    declarations: [
        ChangesLogsComponent
    ],
    bootstrap: [
        ChangesLogsComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ChangesLogsModule {
}
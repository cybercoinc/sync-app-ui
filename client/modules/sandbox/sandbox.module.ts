import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing} from './sandbox.routing';
import {SandboxComponent} from './sandbox.component';

import {ColumnsMatchingComponent} from './columns-matching/columns-matching.component';
import {WorkingDaysMatchingComponent} from './working-days-matching/working-days-matching.component';

import {MaterialModule} from '@angular/material';
import {FormsModule}  from '@angular/forms';


@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,
        FormsModule,
        routing,
    ],
    exports: [],
    declarations: [
        SandboxComponent,
        ColumnsMatchingComponent,
        WorkingDaysMatchingComponent,
    ],
    bootstrap: []
})

export class SandboxModule {
}
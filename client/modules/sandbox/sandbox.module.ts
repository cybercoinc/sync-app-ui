import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing} from './sandbox.routing';
import {SandboxComponent} from './sandbox.component';

import {ColumnsMatchingComponent} from './columns-matching/columns-matching.component';

import {MaterialModule} from '@angular/material';

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,
        routing,
    ],
    exports: [],
    declarations: [
        SandboxComponent,
        ColumnsMatchingComponent,
    ],
    bootstrap: []
})

export class SandboxModule {
}
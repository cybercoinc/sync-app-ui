import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing} from './sandbox.routing';
import {SandboxComponent} from './sandbox.component';

import {ColumnsMatchingComponent} from './columns-matching/columns-matching.component';

@NgModule({
    imports: [
        BrowserModule,
        routing,
    ],
    exports: [

    ],
    declarations: [
        SandboxComponent,
        ColumnsMatchingComponent,
    ],
    providers: [
    ],
    bootstrap: [
    ]
})

export class SandboxModule {
}
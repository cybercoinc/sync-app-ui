import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing} from './sandbox.routing';
import {SandboxComponent} from './sandbox.component';

@NgModule({
    imports: [
        BrowserModule,
        routing,
    ],
    exports: [

    ],
    declarations: [
        SandboxComponent,
    ],
    providers: [
    ],
    bootstrap: [
    ]
})

export class SandboxModule {
}
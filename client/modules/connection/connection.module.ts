import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {ConnectionComponent} from './connection.component';
import {routing} from './connection.routing';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
    ],
    exports: [],
    declarations: [
        ConnectionComponent,
    ],
    bootstrap: [ConnectionComponent]
})
export class ConnectionModule {
}

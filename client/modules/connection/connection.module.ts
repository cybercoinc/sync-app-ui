import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {routing} from "./connection.routing";
import {ConnectionComponent} from "./connection.component";

@NgModule({
    imports: [
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
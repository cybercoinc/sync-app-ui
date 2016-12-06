import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {MaterialModule} from '@angular/material';
import { Dialog } from "./dialog.component";
import { PayTraceComponent } from "./paytrace.component";

@NgModule({
    imports: [
        MaterialModule.forRoot()
    ],
    exports: [PayTraceComponent],
    declarations: [
        PayTraceComponent,
        Dialog
    ],
    bootstrap: [PayTraceComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class PaytraceModule {
}
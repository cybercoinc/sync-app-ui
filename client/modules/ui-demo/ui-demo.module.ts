import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MaterialModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UiDemoComponent } from "./ui-demo.component";
import { routing } from "./routing";
import { DropDownModule } from "../drop-down/drop-down.module";

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        DropDownModule,
        routing
    ],
    declarations: [
        UiDemoComponent,
    ],
    bootstrap: [UiDemoComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class UiDemoModule {
}

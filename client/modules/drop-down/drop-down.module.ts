import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { DropDownComponent } from "./drop-down.component";
import { MaterialModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SearchPipe } from "./search.pipe";
import { DropDownItemComponent } from "./item/drop-down-item.component";

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [DropDownComponent],
    declarations: [
        DropDownComponent,
        DropDownItemComponent,
        SearchPipe
    ],
    bootstrap: [DropDownComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class DropDownModule {
}

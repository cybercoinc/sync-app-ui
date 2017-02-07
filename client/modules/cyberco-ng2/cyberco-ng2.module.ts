import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';

import {TableComponent}  from './table/table.component';
import {LoaderProgressCircularComponent}  from './table/components/loader.component';
import {LoaderService}  from './table/components/loader.service';
import {TableService}  from './table/table.service';
import {DropDownComponent}  from './drop-down/drop-down.component';
import {SearchPipe}  from './drop-down/search.pipe';
import {DropDownItemComponent}  from './drop-down/item/drop-down-item.component';
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        RouterModule,
        MaterialModule.forRoot()
    ],
    exports: [
        TableComponent,
        LoaderProgressCircularComponent,
        DropDownComponent,
        SearchPipe,
        DropDownItemComponent
    ],
    providers: [LoaderService, TableService],
    declarations: [
        TableComponent,
        LoaderProgressCircularComponent,
        DropDownComponent,
        SearchPipe,
        DropDownItemComponent
    ]
})
export class CybercoNg2Module {
}
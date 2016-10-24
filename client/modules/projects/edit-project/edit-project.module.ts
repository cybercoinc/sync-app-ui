import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';

import {editProjectRouting} from './edit-project.routing';

import {EditProjectComponent} from './edit-project.component';
import {PipeRowComponent} from './components/pipe-row.component';
import {PipeStepRowComponent} from './components/pipe-step-row.component';
import {PipePublicTodoComponent} from './components/pipe-public-todo/pipe-public-todo.component';
import {PipePrivateTodoComponent} from './components/pipe-private-todo/pipe-private-todo.component';
import {SmartsheetConnectionPublicComponent} from './components/pipe-public-todo/smartsheet-connection-public/smartsheet-connection-public.component';

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,

        editProjectRouting,
    ],
    exports: [],
    declarations: [
        EditProjectComponent,
        PipeRowComponent,
        PipeStepRowComponent,
        PipePublicTodoComponent,
        PipePrivateTodoComponent,
        SmartsheetConnectionPublicComponent
    ],
    bootstrap: [EditProjectComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class EditProjectModule {
}
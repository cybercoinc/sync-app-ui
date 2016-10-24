import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';

import {editProjectRouting} from './edit-project.routing';

import {EditProjectComponent} from './edit-project.component';
import {PipeConfigComponent} from './components/pipe-config.component';
import {PipePublicTodoComponent} from './components/pipe-public-todo.component';
import {PipePrivateTodoComponent} from './components/pipe-private-todo.component';

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,

        editProjectRouting,
    ],
    exports: [],
    declarations: [
        EditProjectComponent,
        PipeConfigComponent,
        PipePublicTodoComponent,
        PipePrivateTodoComponent
    ],
    bootstrap: [EditProjectComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class EditProjectModule {
}
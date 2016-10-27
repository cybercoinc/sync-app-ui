import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}  from '@angular/forms';
import {MaterialModule} from '@angular/material';

import {editProjectRouting} from './edit-project.routing';

import {EditProjectComponent} from './edit-project.component';
import {PipeRowComponent} from './components/shared/pipe-row.component';
import {PipeStepRowComponent} from './components/shared/pipe-step-row.component';
import {PipePublicTodoComponent} from './components/pipe-public-todo/pipe-public-todo.component';
import {PipePrivateTodoComponent} from './components/pipe-private-todo/pipe-private-todo.component';

import {SmartsheetConnectionPublicComponent} from './components/pipe-public-todo/smartsheet-connection-public.component';
import {SmartsheetConnectionPrivateComponent} from './components/pipe-private-todo/smartsheet-connection-private.component';
import {SmartsheetConnectionComponent} from './components/shared/smartsheet-connection/smartsheet-connection.component';
import {ColumnsMatchingComponent} from './components/shared/columns-matching/columns-matching.component';

import {PipeSettingsPrivateComponent} from './components/pipe-private-todo/pipe-settings-private.component';
import {PipeSettingsPublicComponent} from './components/pipe-public-todo/pipe-settings-public.component';
import {PipeSettingsComponent} from './components/shared/pipe-settings/pipe-settings.component';

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,
        FormsModule,

        editProjectRouting,
    ],
    exports: [],
    declarations: [
        EditProjectComponent,
        PipeRowComponent,
        PipeStepRowComponent,
        PipePublicTodoComponent,
        PipePrivateTodoComponent,

        SmartsheetConnectionPublicComponent,
        SmartsheetConnectionPrivateComponent,
        SmartsheetConnectionComponent,
        ColumnsMatchingComponent,

        PipeSettingsPrivateComponent,
        PipeSettingsPublicComponent,
        PipeSettingsComponent,
    ],
    bootstrap: [EditProjectComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class EditProjectModule {
}
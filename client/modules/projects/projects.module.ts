import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {MaterialModule} from '@angular/material';

import {routing} from './projects.routing';

import {PipeRowComponent} from './edit-project/components/shared/pipe-row.component';
import {EditProjectComponent} from './edit-project/edit-project.component';
import {PipeStepRowComponent} from './edit-project/components/shared/pipe-step-row.component';
import {PipePublicTodoComponent} from './edit-project/components/pipe-public-todo/pipe-public-todo.component';
import {PipePrivateTodoComponent} from './edit-project/components/pipe-private-todo/pipe-private-todo.component';

import {SmartsheetConnectionPublicComponent} from './edit-project/components/pipe-public-todo/smartsheet-connection-public.component';
import {SmartsheetConnectionPrivateComponent} from './edit-project/components/pipe-private-todo/smartsheet-connection-private.component';
import {SmartsheetConnectionComponent} from './edit-project/components/shared/smartsheet-connection/smartsheet-connection.component';
import {ColumnsMatchingComponent} from './edit-project/components/shared/columns-matching/columns-matching.component';

import {PipeSettingsPrivateComponent} from './edit-project/components/pipe-private-todo/pipe-settings-private.component';
import {PipeSettingsPublicComponent} from './edit-project/components/pipe-public-todo/pipe-settings-public.component';
import {PipeSettingsComponent} from './edit-project/components/shared/pipe-settings/pipe-settings.component';

import {IndexComponent} from './index/index.component';

import {SyncSessionsComponent} from './sync-sessions/sync-sessions.component';
import {SyncSessionsPipePublicTodoComponent} from './sync-sessions/components/pipe-public-todo/pipe-public-todo.component';
import {SyncSessionsPipePrivateTodoComponent} from './sync-sessions/components/pipe-private-todo/pipe-private-todo.component';

import {ItemChangesComponent} from './sync-sessions/item-changes/item-changes.component';
import {CreateProjectComponent} from './create-project/create-project.component';

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,
        FormsModule,

        routing,
    ],
    exports: [],
    declarations: [
        IndexComponent,
        SyncSessionsComponent,
        SyncSessionsPipePublicTodoComponent,
        SyncSessionsPipePrivateTodoComponent,
        ItemChangesComponent,
        CreateProjectComponent,
        PipeRowComponent,
        EditProjectComponent,
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
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ProjectsModule {
}
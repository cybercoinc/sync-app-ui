import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';

import {routing} from './projects.routing';

import {EditProjectModule} from './edit-project/edit-project.module';

import {IndexComponent} from './index/index.component';
import {SyncSessionsComponent} from './sync-sessions/sync-sessions.component';
import {ItemChangesComponent} from './sync-sessions/item-changes/item-changes.component';
import {CreateProjectComponent} from './create-project/create-project.component';

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,

        EditProjectModule,

        routing,
    ],
    exports: [],
    declarations: [
        IndexComponent,
        SyncSessionsComponent,
        ItemChangesComponent,
        CreateProjectComponent,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ProjectsModule {
}
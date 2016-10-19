import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {routing} from './projects.routing';

import {IndexComponent} from './index/index.component';
import {SyncSessionsComponent} from './sync-sessions/sync-sessions.component';
import {ItemChangesComponent} from './sync-sessions/item-changes/item-changes.component';

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,

        routing,
    ],
    exports: [],
    declarations: [
        IndexComponent,
        SyncSessionsComponent,
        ItemChangesComponent
    ]
})
export class ProjectsModule {
}
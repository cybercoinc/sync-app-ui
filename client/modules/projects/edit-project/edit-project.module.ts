import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {routing} from './edit-project.routing';

import {EditProjectComponent} from './edit-project.component';
import {PipeConfigComponent} from './components/pipe-config.component';

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,

        routing,
    ],
    exports: [],
    declarations: [
        EditProjectComponent,
        PipeConfigComponent
    ],
    bootstrap: [EditProjectComponent]
})
export class EditProjectModule {
}
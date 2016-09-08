import {NgModule} from '@angular/core';
import {HttpModule} from "@angular/http";
import {IndexComponent} from './index/index.component';

import {MdCardModule} from '@angular2-material/card';
import {MdButtonModule} from '@angular2-material/button';

import {routing} from "./projects.routing";


@NgModule({
    imports: [
        MdCardModule,
        MdButtonModule,

        HttpModule,
        routing,
    ],
    exports: [],
    declarations: [IndexComponent, IndexComponent],
    bootstrap: [IndexComponent]
})
export class ProjectsModule {
}
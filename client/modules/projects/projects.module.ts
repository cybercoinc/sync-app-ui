import {NgModule} from '@angular/core';
import {HttpModule} from "@angular/http";
import {IndexComponent} from './index/index.component';
import {ConnectComponent} from './connect/connect.component';

import {routing} from "./projects.routing";


@NgModule({
    imports: [
        HttpModule,
        routing,
    ],
    exports: [],
    declarations: [IndexComponent, IndexComponent],
    bootstrap: [IndexComponent]
})
export class ProjectsModule {
}
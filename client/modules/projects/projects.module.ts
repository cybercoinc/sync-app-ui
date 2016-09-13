import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {IndexComponent} from './index/index.component';
import {routing} from "./projects.routing";

import {MdCardModule} from '@angular2-material/card';
import {MdButtonModule} from '@angular2-material/button';
import {MdToolbarModule} from '@angular2-material/toolbar';
import {MdIconModule} from '@angular2-material/icon';
import {MdSidenavModule} from '@angular2-material/sidenav';
import {MdListModule} from '@angular2-material/list';


@NgModule({
    imports: [
        MdCardModule,
        MdButtonModule,
        MdToolbarModule,
        MdIconModule,
        MdSidenavModule,
        MdListModule,

        CommonModule,
        routing,
    ],
    exports: [],
    declarations: [IndexComponent, IndexComponent],
    bootstrap: [IndexComponent]
})
export class ProjectsModule {
}
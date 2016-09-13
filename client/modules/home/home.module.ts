import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";

import {HomeComponent} from "./home.component";
import {routing} from "./home.routing";
import {SharedModule} from "../shared/shared.module";
import {ProjectsModule} from "../projects/projects.module";

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        routing,
        SharedModule.forRoot(),
        ProjectsModule,
    ],
    declarations: [
        HomeComponent
    ],
    bootstrap: [
        HomeComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class HomeModule {
}
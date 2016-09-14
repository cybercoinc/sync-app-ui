import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from "@angular/http";

import {AppComponent}  from './app.component';
import {routing} from "./routes";

import {HelloComponent} from "./components/shared/hello.component";
import {ProjectsModule} from "./modules/projects/projects.module";
import {HomeModule} from "./modules/home/home.module";

import {MdCardModule} from '@angular2-material/card';
import {MdButtonModule} from '@angular2-material/button';
import {MdToolbarModule} from '@angular2-material/toolbar';
import {MdIconModule} from '@angular2-material/icon';
import {MdSidenavModule} from '@angular2-material/sidenav';
import {MdListModule} from '@angular2-material/list';

import {MsProjectClientService} from './service/microservices/ms-project-client.service';
import {MsUserClientService} from './service/microservices/ms-user-client.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        ProjectsModule,
        HomeModule,

        MdCardModule,
        MdButtonModule,
        MdToolbarModule,
        MdIconModule,
        MdSidenavModule,
        MdListModule,

        routing,
    ],
    providers: [
        MsProjectClientService,
        MsUserClientService,
    ],

    declarations: [
        HelloComponent,
        AppComponent,
    ],

    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule {
}
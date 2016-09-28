import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from "@angular/http";

import {AppComponent}  from 'app.component';

import {routing} from "routes";

import {ProjectsModule} from "./modules/projects/projects.module";
import {AuthModule} from "./modules/auth/auth.module";
import {HomeModule} from "./modules/home/home.module";
import {ConnectionModule} from './modules/connection/connection.module'

import {MdCardModule} from '@angular2-material/card';
import {MdButtonModule} from '@angular2-material/button';
import {MdToolbarModule} from '@angular2-material/toolbar';
import {MdIconModule} from '@angular2-material/icon';
import {MdSidenavModule} from '@angular2-material/sidenav';
import {MdListModule} from '@angular2-material/list';
import {MdRadioModule} from '@angular2-material/radio';

import {MsProjectClientService} from 'service/microservices/ms-project-client.service';
import {MsUserClientService} from 'service/microservices/ms-user-client.service';

import {AuthService} from 'service/auth.service';
import {AuthGuardService} from 'service/auth-guard.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        ProjectsModule,
        ConnectionModule,
        AuthModule,
        HomeModule,

        MdCardModule,
        MdButtonModule,
        MdToolbarModule,
        MdIconModule,
        MdSidenavModule,
        MdListModule,
        MdRadioModule,

        routing,
    ],
    providers: [
        AuthService,
        AuthGuardService,
        MsProjectClientService,
        MsUserClientService,
    ],

    declarations: [
        AppComponent,
    ],

    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule {
}
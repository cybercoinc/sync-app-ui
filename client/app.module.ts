import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {provideAuth} from "angular2-jwt";
import {HttpModule} from "@angular/http";
import {NgSemanticModule} from "ng-semantic";

import {AppComponent}  from './app.component';
import {routing} from "./routes";

import {HelloComponent} from "./components/shared/hello.component";

import {ContactModule} from "./modules/contact/contact.module";
import {ProjectsModule} from "./modules/projects/projects.module";
import {HomeModule} from "./modules/home/home.module";

import {MdCardModule} from '@angular2-material/card';
import {MdButtonModule} from '@angular2-material/button';
import {MdToolbarModule} from '@angular2-material/toolbar';
import {MdIconModule} from '@angular2-material/icon';
import {MdSidenavModule} from '@angular2-material/sidenav';
import {MdListModule} from '@angular2-material/list';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        NgSemanticModule,
        ContactModule,
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
        provideAuth({
            globalHeaders: [{"Content-type": "application/json"}],
            newJwtError: true,
            noTokenScheme: true
        })
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
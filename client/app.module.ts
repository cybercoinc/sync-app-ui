import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from "@angular/http";

import {AppComponent}  from './app.component';

import {routing} from "./routes";

import {UserApplicationModule} from 'client/modules/user-application/user-application.module';
import {AuthModule} from "./modules/auth/auth.module";
import {SandboxModule} from './modules/sandbox/sandbox.module';

import {MaterialModule} from '@angular/material';

import {MsProjectClientService} from './service/microservices/ms-project-client.service';
import {MsUserClientService} from './service/microservices/ms-user-client.service';
import {MsSyncClientService} from './service/microservices/ms-sync-client.service';

import {AuthService} from './service/auth.service';
import {AuthGuardService} from './service/auth-guard.service';
import {FormsModule}  from '@angular/forms';

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,
        HttpModule,
        AuthModule,
        UserApplicationModule,
        FormsModule,
        SandboxModule,

        routing,
    ],

    providers: [
        AuthService,
        AuthGuardService,
        MsProjectClientService,
        MsUserClientService,
        MsSyncClientService
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
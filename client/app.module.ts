import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from "@angular/http";
import {FormsModule}  from '@angular/forms';
import {MaterialModule} from '@angular/material';

import {AppComponent}  from './app.component';
import {routing} from "./routes";

import {MsProjectClientService} from './service/microservices/ms-project-client.service';
import {MsUserClientService} from './service/microservices/ms-user-client.service';
import {MsSyncClientService} from './service/microservices/ms-sync-client.service';
import {MsLicenseClientService} from './service/microservices/ms-license-client.service';

import {AuthService} from './service/auth.service';
import {PipeConnectionService} from './service/pipe-connection.service';
import {AuthGuardService} from './service/auth-guard.service';

import {AuthModule} from "./modules/auth/auth.module";
import {SandboxModule} from './modules/sandbox/sandbox.module';
import {ConnectionModule} from 'client/modules/connection/connection.module';
import {ProjectsModule} from 'client/modules/projects/projects.module';
import {BillingModule} from 'client/modules/billing/billing.module';
@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,
        HttpModule,
        AuthModule,
        FormsModule,
        SandboxModule,
        ConnectionModule,
        ProjectsModule,
        BillingModule,

        routing,
    ],

    providers: [
        AuthService,
        AuthGuardService,
        MsProjectClientService,
        MsUserClientService,
        MsLicenseClientService,
        MsSyncClientService,
        PipeConnectionService,
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
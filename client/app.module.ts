import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from "@angular/http";
import {FormsModule}  from '@angular/forms';
import {MaterialModule} from '@angular/material';

import {AppComponent}  from './app.component';
import {routing} from "./routes";

import {UserMenuComponent}  from './components/shared/usermenu.component';

import {MsProjectClientService} from './service/microservices/ms-project-client.service';
import {MsUserClientService} from './service/microservices/ms-user-client.service';
import {MsSyncClientService} from './service/microservices/ms-sync-client.service';
import {MsLicenseClientService} from './service/microservices/ms-license-client.service';

import {AuthService} from './service/auth.service';
import {PipeConnectionService} from './service/pipe-connection.service';
import {AuthGuardService} from './service/auth-guard.service';
import {ProjectGuardService} from './service/project-guard.service';

import {AuthModule} from "./modules/auth/auth.module";
import {ConnectionModule} from 'client/modules/connection/connection.module';
import {ProjectsModule} from 'client/modules/projects/projects.module';
import {BillingModule} from 'client/modules/billing/billing.module';
import {SettingsModule} from 'client/modules/settings/settings.module';
import {PendingRequestsService} from "./service/pending-requests.service";
import {LoaderProgressBarComponent} from "./components/shared/loader.component";
import {ConfigService} from "./service/config.service";
import {RbacService} from "./service/rbac.service";
import {AuthBootstrapService} from "./service/resolvers/auth-bootstrap.service";
import {GuestBootstrapService} from "./service/resolvers/guest-bootstrap.service";

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,
        HttpModule,
        AuthModule,
        FormsModule,
        ConnectionModule,
        ProjectsModule,
        BillingModule,
        SettingsModule,

        routing,
    ],

    providers: [
        AuthService,
        RbacService,
        AuthGuardService,
        ProjectGuardService,
        PendingRequestsService,
        MsProjectClientService,
        MsUserClientService,
        MsLicenseClientService,
        MsSyncClientService,
        PipeConnectionService,
        ConfigService,
        GuestBootstrapService,
        AuthBootstrapService
    ],

    declarations: [
        AppComponent,
        UserMenuComponent,
        LoaderProgressBarComponent
    ],

    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule {
}
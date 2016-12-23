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

import {AuthModule} from "./modules/auth/auth.module";
import {ConnectionModule} from 'client/modules/connection/connection.module';
import {ProjectsModule} from 'client/modules/projects/projects.module';
import {BillingModule} from 'client/modules/billing/billing.module';
import {CompaniesModule} from 'client/modules/companies/companies.module';
import {MsClientService} from "./service/microservices/ms-client.service";
import {PendingRequestsService} from "./service/pending-requests.service";
import {LoaderProgressBarComponent} from "./components/shared/loader.component";
import { UiDemoModule } from "./modules/ui-demo/ui-demo.module";

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
        CompaniesModule,
        UiDemoModule,

        routing,
    ],

    providers: [
        AuthService,
        AuthGuardService,
        PendingRequestsService,
        MsClientService,
        MsProjectClientService,
        MsUserClientService,
        MsLicenseClientService,
        MsSyncClientService,
        PipeConnectionService,
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
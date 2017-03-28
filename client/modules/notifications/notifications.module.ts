import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {NotificationsComponent} from "./notifications.component";
import {NotificationsService} from "./notifications.service";
import {ConfirmNotificationDialog} from "./kinds/confirm.notification";

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,
    ],
    exports: [
        NotificationsComponent
    ],
    declarations: [
        NotificationsComponent,
        ConfirmNotificationDialog
    ],
    providers: [
        NotificationsService
    ],
    entryComponents: [
        ConfirmNotificationDialog
    ],
})
export class NotificationsModule {
}
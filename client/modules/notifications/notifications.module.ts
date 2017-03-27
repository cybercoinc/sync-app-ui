import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {NotificationsComponent} from "./notifications.component";
import {NotificationsService} from "./notifications.service";
import {ModalNotification, ModalNotificationDialog} from "./kinds/modal.notification";

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
        ModalNotificationDialog
    ],
    providers: [
        NotificationsService
    ],
    entryComponents: [
        ModalNotificationDialog
    ],
})
export class NotificationsModule {
}
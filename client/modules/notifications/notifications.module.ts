import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {NotificationsComponent} from "./notifications.component";
import {NotificationsService} from "./notifications.service";
import {ConfirmNotificationDialog} from "./kinds/confirm.notification";
import {ReactionNotificationCard} from "./kinds/reaction.notification";
import {Routes, RouterModule} from '@angular/router';

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,
        RouterModule
    ],
    exports: [
        NotificationsComponent
    ],
    declarations: [
        NotificationsComponent,
        ConfirmNotificationDialog,
        ReactionNotificationCard
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
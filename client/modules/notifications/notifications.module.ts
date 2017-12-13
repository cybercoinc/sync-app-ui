import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {NotificationsComponent} from "./notifications.component";
import {NotificationsService} from "./notifications.service";
import {ConfirmNotificationDialog} from "./kinds/confirm.notification";
import {PromptNotificationDialog} from "./kinds/prompt.notification";
import {ReactionNotificationCard} from "./kinds/reaction.notification";
import {Routes, RouterModule} from '@angular/router';
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,
        FormsModule,
        RouterModule,
    ],
    exports: [
        NotificationsComponent
    ],
    declarations: [
        NotificationsComponent,
        ConfirmNotificationDialog,
        PromptNotificationDialog,
        ReactionNotificationCard
    ],
    providers: [
        NotificationsService
    ],
    entryComponents: [
        ConfirmNotificationDialog,
        PromptNotificationDialog
    ],
})
export class NotificationsModule {
}
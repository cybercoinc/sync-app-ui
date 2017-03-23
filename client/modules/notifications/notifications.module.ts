import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {NotificationsComponent} from "./notifications.component";
import {NotificationsService} from "./notifications.service";

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
    ],
    providers: [
        NotificationsService
    ]
})
export class NotificationsModule {
}
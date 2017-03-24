import {Component, OnInit} from '@angular/core';
import {NotificationsService} from "./notifications.service";

@Component({
    selector: 'notifications',
    templateUrl: 'client/modules/notifications/notifications.component.html',
    styleUrls: [
        'client/modules/notifications/notifications.component.css'
    ]
})
export class NotificationsComponent implements OnInit {

    constructor(protected NotificationsService: NotificationsService) {
    }

    ngOnInit() {
        this.NotificationsService.notifications
            .subscribe({
                next: notification => this.render(notification)
            });
    }

    protected render(notification) {
        this.renderedNotifications.push(notification);

        // setTimeout(() => {
        //     this.hide(messageObj);
        // }, 3000)
    }

    protected hide(messageObj) {
        let mesObj = this.renderedNotifications[this.renderedNotifications.indexOf(messageObj)];

        mesObj.viewed = true;
    }

    protected renderedNotifications = [];
}
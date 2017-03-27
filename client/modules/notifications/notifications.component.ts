import {Component, OnInit} from '@angular/core';
import {NotificationsService} from "./notifications.service";
import {Router, NavigationStart} from "@angular/router";
import 'rxjs/add/operator/filter';

@Component({
    selector: 'notifications',
    templateUrl: 'client/modules/notifications/notifications.component.html',
    styleUrls: [
        'client/modules/notifications/notifications.component.css'
    ]
})
export class NotificationsComponent implements OnInit {

    constructor(protected NotificationsService: NotificationsService, private Router: Router) {
    }

    ngOnInit() {
        this.NotificationsService.notifications
            .subscribe({
                next: notification => this.render(notification)
            });

        this.Router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe((e) => {
                this.renderedNotifications.forEach(notification => {
                    this.hide(notification);
                })
            });
    }

    protected render(notification) {
        this.renderedNotifications.push(notification);

        // setTimeout(() => {
        //     this.hide(messageObj);
        // }, 3000)
    }

    protected hide(notification) {
        let notificationObj = this.renderedNotifications[this.renderedNotifications.indexOf(notification)];

        notificationObj.viewed = true;
    }

    protected renderedNotifications = [];
}
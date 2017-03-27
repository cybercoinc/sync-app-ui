import {Component, OnInit} from '@angular/core';
import {NotificationsService} from "./notifications.service";
import {Router, NavigationStart} from "@angular/router";
import 'rxjs/add/operator/filter';
import {LineNotification} from "./kinds/line.notification";
import {ModalNotification} from "./kinds/modal.notification";

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
            .subscribe((e) => {
                if (e instanceof LineNotification) {
                    this.renderLine(e)
                }

                if (e instanceof ModalNotification) {
                    this.renderModal(e)
                }
            });

        this.Router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe((e) => {
                this.lineNotifications.forEach(notification => {
                    notification.hide();
                })
            });
    }

    protected renderLine(notification) {
        this.lineNotifications.push(notification);
    }

    protected renderModal(notification: ModalNotification) {
        notification.render();
    }

    protected lineNotifications: LineNotification[] = [];
}
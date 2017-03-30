import {Component, OnInit} from '@angular/core';
import {NotificationsService} from "./notifications.service";
import {Router, NavigationStart} from "@angular/router";
import 'rxjs/add/operator/filter';
import {LineNotification} from "./kinds/line.notification";
import {ConfirmNotification} from "./kinds/confirm.notification";
import {ReactionNotification} from "./kinds/reaction.notification";

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
            .subscribe((n) => {
                if (n instanceof LineNotification) {
                    this.renderLine(n);
                }

                if (n instanceof ReactionNotification) {
                    this.renderReaction(n);
                }

                n.render();
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

    protected renderReaction(notification) {
        this.reactionNotifications.push(notification);
    }

    protected lineNotifications: LineNotification[] = [];
    protected reactionNotifications: ReactionNotification[] = [];
}
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
        this.NotificationsService.data
            .subscribe({
                next: messageObj => this.renderMessage(messageObj)
            });
    }

    protected renderMessage(messageObj) {
        this.messages.push(messageObj);

        // setTimeout(() => {
        //     this.hide(messageObj);
        // }, 3000)
    }

    protected hide(messageObj) {
        let mesObj = this.messages[this.messages.indexOf(messageObj)];

        mesObj.viewed = true;
    }

    protected messages = [];
}
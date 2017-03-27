import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {LineNotification} from "./kinds/line.notification";
import {BaseNotification} from "./kinds/base.notification";

const TYPE_INFO = 'info';
const TYPE_ERROR = 'error';
const TYPE_WARNING = 'warning';

@Injectable()
export class NotificationsService {
    constructor() {
        this.notifications = new Subject();
    }

    public notifications: Subject<BaseNotification[]>;

    private pushNotification(notification) {
        this.notifications.next(notification);
    }

    public addInfo(text: string, isQuitable: boolean = true) {
        let notification = new LineNotification();

        notification.setMessage(text);
        notification.setType(TYPE_INFO);
        notification.setQuitableFlag(isQuitable);

        this.pushNotification(notification);
    }

    public addError(text: string, isQuitable: boolean = true) {
        let notification = new LineNotification();

        notification.setMessage(text);
        notification.setType(TYPE_ERROR);
        notification.setQuitableFlag(isQuitable);

        this.pushNotification(notification);
    }

    public addWarning(text: string, isQuitable: boolean = true) {
        let notification = new LineNotification();

        notification.setMessage(text);
        notification.setType(TYPE_WARNING);
        notification.setQuitableFlag(isQuitable);

        this.pushNotification(notification);
    }

    public addConfirm(text) {

    }

    public addCustom() {
        // todo implement later
    }
}
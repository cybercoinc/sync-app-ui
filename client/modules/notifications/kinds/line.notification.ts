import {BaseNotification} from "./base.notification";

export class LineNotification extends BaseNotification {
    protected position: 'bottom-lined';

    public hide() {
        this.viewed = true;
    }

    public isViewed() {
        return this.viewed;
    }
}
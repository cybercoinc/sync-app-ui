import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

const TYPE_INFO = 'info';
const TYPE_ERROR = 'error';
const TYPE_WARNING = 'warning';

@Injectable()
export class NotificationsService {
    constructor() {
        this.data = new Subject();
    }

    public data: Subject<{
        text: string,
        type: string,
        viewed: boolean
    }>;

    /**
     * @private
     * @param text
     * @param type
     */
    private addData(text, type) {
        this.data.next({
            text: text,
            type: type,
            viewed: false
        });
    }

    public addInfo(text: string) {
        this.addData(text, TYPE_INFO);
    }

    public addError(text: string) {
        this.addData(text, TYPE_ERROR);
    }

    public addWarning(text: string) {
        this.addData(text, TYPE_WARNING);
    }
}
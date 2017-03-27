const TYPE_INFO = 'info';
const TYPE_ERROR = 'error';
const TYPE_WARNING = 'warning';


export class BaseNotification {
    constructor() {

    }

    protected viewed: boolean = false;
    protected quitable: boolean = true;

    protected message: string;
    protected position: string;
    protected type: 'error' | 'info' | 'warning';

    public setType(type) {
        this.type = type;
    }

    public setMessage(message) {
        this.message = message;
    }

    public setQuitableFlag(quitAllowed: boolean) {
        this.quitable = quitAllowed;
    }

    public getMessage() {
        return this.message;
    }

    public getType() {
        return this.type;
    }

    public isQuitable() {
        return this.quitable;
    }
}
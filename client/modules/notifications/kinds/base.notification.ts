const TYPE_INFO = 'info';
const TYPE_ERROR = 'error';
const TYPE_WARNING = 'warning';


export abstract class BaseNotification {
    constructor() {

    }

    protected viewed: boolean = false;
    protected quitable: boolean = true;

    protected message: string;
    protected subject: string;
    protected position: string;
    protected type: 'error' | 'info' | 'warning';

    public setType(type) {
        this.type = type;
    }

    public setSubject(subject) {
        this.subject = subject;
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

    public render() {

    };
}
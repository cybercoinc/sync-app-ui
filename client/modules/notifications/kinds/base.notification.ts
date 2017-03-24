const TYPE_INFO = 'info';
const TYPE_ERROR = 'error';
const TYPE_WARNING = 'warning';


export class BaseNotification {
    constructor() {

    }

    protected viewed: boolean = false;
    protected message: string;
    protected position: string;
    protected type: 'error' | 'info' | 'warning';

    public setType(type) {
        this.type = type;
    }

    public setMessage(message) {
        this.message = message;
    }
}
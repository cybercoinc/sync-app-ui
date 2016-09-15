import {MsClientService} from "./ms-client.service";
import {Headers, Http, URLSearchParams} from '@angular/http';

export class MsUserClientService extends MsClientService {
    url = 'http://localhost:3002';

    getMe() {
        return this.makeMsCall('/me', 'GET');
    }

}

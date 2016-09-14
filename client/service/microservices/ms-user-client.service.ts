import {MsClientService} from "./ms-client.service";
import {Headers, Http, URLSearchParams} from '@angular/http';

export class MsUserClientService extends MsClientService {
    url = 'http://localhost:3002';

    getMe(): Promise<[{}]> {
        return this.Http.get(this.url + '/me')
            .toPromise()
            .then(response => response.json().result)
            .catch(this.handleError);
    }

}

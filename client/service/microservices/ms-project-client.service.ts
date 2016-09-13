import {MsClientService} from "./ms-client.service";
import {Headers, Http, URLSearchParams} from '@angular/http';

export class MsProjectClientService extends MsClientService {
    url = 'http://localhost:3003';

    getProjects(): Promise<[{}]> {
        return this.Http.get(this.url + '/find-where')
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    getActiveProjects(): Promise<[{}]> {
        let params: URLSearchParams = new URLSearchParams();
        let paramsObj = {
            status: 'active'
        };

        params.set('params', JSON.stringify(paramsObj));

        return this.Http.get(this.url + '/find-where', {search: params})
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

}

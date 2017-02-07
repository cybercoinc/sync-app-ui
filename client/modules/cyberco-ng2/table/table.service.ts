import {Headers, RequestOptions, Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Injectable} from "@angular/core";

@Injectable()
export class TableService {
    constructor(protected Http: Http) {
    }

    url: string;
    headers: {};

    protected prefix: string;

    getData(filters: any = []): Promise<any> {
        let fullUrl = this.url + 'data-table';

        let requestOptions = new RequestOptions({
            headers: new Headers(this.headers),
            method: 'POST',
            body: {
                filters: filters
            },
            withCredentials: true,
        });

        return this.Http.request(fullUrl, requestOptions)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.warn(err);
            })
    }
}
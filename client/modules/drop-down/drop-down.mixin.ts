import { RequestOptions, Headers, Http } from "@angular/http";
import { Inject } from "@angular/core";

export class DropDownMixin {
    url: string;

    // constructor(@Inject(Http) protected Http: Http) {}

    getData(authTokenId) {
        // let requestOptions = new RequestOptions({
        //     headers: new Headers({
        //         'Content-Type': 'application/json',
        //         'auth-token-id': authTokenId
        //     }),
        //     method: 'GET',
        //     withCredentials: true
        // });
        //
        // this.Http.post(this.url + 'get-data', { data: '123123' }, requestOptions).toPromise().then(response => {
        //     console.log();
        // });
    }
}

import {Injectable} from '@angular/core';

@Injectable()
export class MsClientService {

    url: string;
    secureStr: string = 'someRandomGeneratedString123';
    callerMsName: string = 'app-ui';

    // constructor(public params: {url}) {
    //     this.url = params.url;
    // }

    public makeApiCall(): {} {
        return {
            property: 'value'
        }
    }
}
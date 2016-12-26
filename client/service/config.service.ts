import {Injectable}     from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

@Injectable()
export class ConfigService {
    constructor(protected Http: Http) {

    }

    configs;
    services = [];

    load() {
        return new Promise((resolve, reject) => {
            console.log('start config resolve');

            if (!this.configs) {
                let requestOptions = new RequestOptions({
                    headers: new Headers({
                        'Content-Type': 'application/json',
                    }),
                    method: 'GET',
                    withCredentials: true
                });

                return this.Http.request('/configs', requestOptions)
                    .toPromise()
                    .then(response => {
                        let resObj = response.json();

                        return resObj.result;
                    })
                    .then((configs) => {
                        this.configs = configs;

                        return this.Http.request(this.getConfig('ms_main_url') + 'services', new RequestOptions({
                            headers: new Headers({
                                'Content-Type': 'application/json',
                            }),
                            method: 'GET',
                            withCredentials: true
                        }))
                            .toPromise()
                            .then(response => {
                                let resObj = response.json();

                                return resObj.result;
                            });
                    })
                    .then(services => {
                        this.services = services;

                        return resolve(this.configs);
                    })
                    .catch(err => reject(err));
            } else {
                return resolve(this.configs);
            }
        });
    }

    getConfig(prop) {
        return this.configs[prop];
    }

    getServiceUrl(serviceName: string) {
        let url = '';

        this.services.forEach(function (service: {category: string, name: string, value: {url: string}}) {
            if (service.category === 'services' && service.name === serviceName) {
                url = service.value.url;
                return;
            }
        });

        if (!url) {
            throw new Error('no url for ' + serviceName);
        }

        return url;
    }
}

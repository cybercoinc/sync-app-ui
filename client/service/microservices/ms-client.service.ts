import {Injectable} from '@angular/core';
import {Headers, Http, URLSearchParams, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {PendingRequestsService} from "../pending-requests.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {ConfigService} from "../config.service";
import {NotificationsService} from "client/modules/notifications/notifications.service";

@Injectable()
export class MsClientService {
    msName: string;

    constructor(protected Http: Http, protected PendingRequestsService: PendingRequestsService,
                protected router: Router, protected AuthService: AuthService, protected ConfigService: ConfigService, protected NotificationsService: NotificationsService) {
    }

    /**
     * Make http call to microservice.
     *
     * @param {String} action
     * @param {String} method GET, POST, PUT, DELETE
     * @param {} data
     * @param {Boolean} needToGetServiceName
     *
     */
    public makeMsCall(action: string, method: string, data: {} = {}, needToGetServiceName = true) {
        let params, body;
        let headers = new Headers({
            'Content-Type': 'application/json',
            'auth-token-id': this.AuthService ? this.AuthService.authTokenId : null
        });

        this.PendingRequestsService.hasPendingRequest = true;

        let url = '';

        if (needToGetServiceName) {
            url = this.ConfigService.getServiceUrl(this.msName);
        }

        console.log('make ms call', url, action);

        if (method === 'GET' || method === 'DELETE') {
            params = new URLSearchParams();
            for (let prop in data) {
                if (data.hasOwnProperty(prop)) {
                    let value = data[prop];

                    if (Array.isArray(value)) {
                        value.forEach(function (val) {
                            params.append(prop + '[]', val)
                        })
                    } else {
                        params.set(prop, data[prop]);
                    }
                }
            }
        } else if (method === 'POST' || method === 'PUT') {
            body = JSON.stringify(data);
        }

        let requestOptions = new RequestOptions({
            headers: headers,
            method: method,
            search: params ? params : null,
            body: body ? body : null,
            withCredentials: true
        });

        return this.Http.request(url + action, requestOptions)
            .toPromise()
            .then(response => {
                this.PendingRequestsService.hasPendingRequest = false;

                if (response.status === 202) {
                    throw response;
                }

                let resObj = response.json();

                return resObj.result;
            })
            .catch((response: any) => {
                this.PendingRequestsService.hasPendingRequest = false;

                return this.handleError(response);
            });
    }

    protected handleError(response: any): Promise<any> | string {
        let message = response.statusText;
        let errorCode;

        if (response['_body']) {
            try {
                let jsonBody = JSON.parse(response['_body']);

                if (jsonBody.message) {
                    message = jsonBody.message;
                }

                if (jsonBody.result) {
                    errorCode = jsonBody.result.code;
                }

            } catch (err) {
                message = 'Error while parsing response from ' + this.msName + '. Service unavailable.';
            }
        }

        switch (errorCode) {
            case 2001: {
                this.NotificationsService.addReaction('Error. You don`t have Smartsheet credentials connected. Please connect your account.',
                    'error',
                    'Smartsheet connection required',
                    [
                        {label: 'Connect Smartsheet', route: ['/', 'connection']},
                        {label: 'Cancel', route: ['/']},
                    ]);

                break;
            }

            case 2002: {
                this.NotificationsService.addReaction('Error. You don`t have Procore credentials connected. Please connect your account.',
                    'error',
                    'Procore connection required',
                    [
                        {label: 'Connect Procore', route: ['/', 'connection']},
                        {label: 'Cancel', route: ['/']},
                    ]);

                break;
            }

            case 2003: {
                this.NotificationsService.addReaction('Error. Your Smartsheet access token is invalid. Please reconnect your account.',
                    'error',
                    'Smartsheet reconnection required',
                    [
                        {label: 'Reconnect Smartsheet', route: ['/', 'connection']},
                        {label: 'Cancel', route: ['/']},
                    ]);

                break;
            }

            case 2004: {
                this.NotificationsService.addReaction('Error. Your Procore access token is invalid. Please relogin.',
                    'error',
                    'Relogin required',
                    [
                        {
                            label: 'Relogin',
                            action: () => {
                                let url = this.ConfigService.getServiceUrl('ms-user');

                                return this.makeMsCall(url + 'auth/user-logout', 'POST', {}, false)
                                    .then(() => {
                                        this.AuthService.authUser = null;

                                        window.location.replace('/');
                                    });
                            }
                        },
                        {label: 'Cancel', route: ['/']},
                    ]);

                break;
            }

            default: {
                this.NotificationsService.addError(message);
            }
        }


        if (response.status === 401) {
            Promise.reject(new Error('not authorized'));

            this.router.navigate(['/auth', 'procore']);
        }

        return Promise.reject(response.message || response);
    }

    create(data: {}): Promise<[number]> {
        return this.makeMsCall(
            'create',
            'POST',
            data
        );
    }

    update(id, data: {}): Promise<number> {
        return this.makeMsCall(
            'update/' + id,
            'PUT',
            data
        );
    }

    findManyByIdsList(idsList: [number]): Promise<[any]> {
        return this.makeMsCall(
            'find-many-by-ids-list',
            'GET',
            idsList
        );
    }
}
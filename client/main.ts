/// <reference path="../typings/index.d.ts" />
import {enableProdMode} from "@angular/core";

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from 'app.module';
import {Config} from 'config';

enableProdMode();

fetch(Config.getEnvironmentVariable('ms-main-url') + '/services') // todo move this to root route resolver
    .then(resp => resp.json())
    .then(resJson => {
        window['services'] = resJson.result;

        platformBrowserDynamic().bootstrapModule(AppModule);
    });


/// <reference path="../typings/index.d.ts" />
import {enableProdMode} from "@angular/core";

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';
import {Config} from './config';

let env = Config.getEnvironmentVariable('environment');

// if (env !== 'development') {
    enableProdMode();
// }

// fetch(Config.getEnvironmentVariable('ms-main-url') + '/services')
//     .then(resp => resp.json())
//     .then(resJson => {
//         window['services'] = resJson.result;
//
//         platformBrowserDynamic().bootstrapModule(AppModule);
//     });

platformBrowserDynamic().bootstrapModule(AppModule);


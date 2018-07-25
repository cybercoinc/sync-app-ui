/// <reference path="../typings/index.d.ts" />
import * as express from "express";
import {join} from "path";
import {json, urlencoded} from "body-parser";
let config = require('config');
let cors = require('cors');

const app: express.Application = express();
app.disable("x-powered-by");

// forse HTTPS
app.use(function (req, res, next) {
    let options = {
        maxAge: 10886400,
        includeSubDomains: true,
        preload: true
    };
    let ignoreRequest = (['prod', 'dev'].indexOf(process.env.NODE_ENV) === -1);
    let ignoreFilter = function (req) {
        return (req.url.indexOf('/_ah/health') > -1);
    };

    let secure = (req.get('X-Forwarded-Proto') === "https");

    if (ignoreFilter) {
        ignoreRequest = ignoreRequest || ignoreFilter(req);
    }

    if (!ignoreRequest) {
        if (!secure) {
            res.writeHead(301, {
                Location: 'https://' + req.get('host') + req.url
            });
            res.end();
        } else {
            let header = 'max-age=' + options.maxAge;
            if (options.includeSubDomains) header += '; includeSubDomains';
            if (options.preload) header += '; preload';
            res.setHeader('Strict-Transport-Security', header);
            next();
        }
    } else {
        next();
    }
});

app.use(express.static(join(__dirname, '../public')));
app.use(json());
app.use(urlencoded({extended: true}));

app.use('/client', express.static(join(__dirname, '../client')));

let originsWhitelist = [
    'http://localhost:4500',
    'https://sc-dot-app-status-page.appspot-preview.com',
    'https://sc-dev-dot-app-status-page.appspot-preview.com',
    'https://sc-qa-dot-app-status-page.appspot-preview.com',
    'https://sc-prod-dot-app-status-page.appspot-preview.com',
];
let corsOptions = {
    origin: function(origin, callback){
        let isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials:true
};
app.use(cors(corsOptions));

// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {

    app.use(express.static(join(__dirname, '../node_modules')));
    app.use(express.static(join(__dirname, '../tools')));

    app.use(function (err, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}

app.get('/configs', (req, res, next) => {
    return res.json({
        result: config
    })
});

app.get('/_ah/health', function (req, res, next) {
    let response = {
        status: "Ok",
        message: "Microservice is available",
        details: [],
        config: config.util.getConfigSources(),
        version: config.VERSION
    };

    return res.json(response);
});

app.get('/_ah/warmup', function (req, res, next) {
    let response = {
        status: "Ok",
        message: "Warmup is done"
    };

    return res.json(response);
});

// catch 404 and forward to error handler
app.use(function (req: express.Request, res: express.Response, next) {
    res.status(404).json({message: 'Not Found'});
});

// production error handler
// no stacktrace leaked to user
app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    let message = err.response || err.message || 'Something broke!';
    res.status(err.status || 500)
        .json({
            'error': {},
            'message': message
        });
});

export {app}

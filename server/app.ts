/// <reference path="../typings/index.d.ts" />
import * as express from "express";
import {join} from "path";
import {json, urlencoded} from "body-parser";
let config = require('config');


const app: express.Application = express();
app.disable("x-powered-by");

app.use(express.static(join(__dirname, '../public')));
app.use(json());
app.use(urlencoded({extended: true}));

app.use('/client', express.static(join(__dirname, '../client')));

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

app.get('/config', (req, res, next) => {
    return res.json({
        result: config
    })
});

// catch 404 and forward to error handler
app.use(function (req: express.Request, res: express.Response, next) {
    let err = new Error("Not Found");
    next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});

export {app}

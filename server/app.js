"use strict";
/// <reference path="../typings/index.d.ts" />
var express = require("express");
var path_1 = require("path");
var body_parser_1 = require("body-parser");
var config = require('config');
var app = express();
exports.app = app;
app.disable("x-powered-by");
app.use(express.static(path_1.join(__dirname, '../public')));
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({ extended: true }));
app.use('/client', express.static(path_1.join(__dirname, '../client')));
// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(express.static(path_1.join(__dirname, '../node_modules')));
    app.use(express.static(path_1.join(__dirname, '../tools')));
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}
app.get('/configs', function (req, res, next) {
    return res.json({
        result: config
    });
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).json({ message: 'Not Found' });
});
// production error handler
// no stacktrace leaked to user
app.use(function (err, req, res, next) {
    var message = err.response || err.message || 'Something broke!';
    res.status(err.status || 500)
        .json({
        'error': {},
        'message': message
    });
});
//# sourceMappingURL=app.js.map
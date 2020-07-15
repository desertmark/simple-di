"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Patch = exports.Put = exports.Post = exports.Get = exports.Endpoint = exports.Controller = void 0;
var constants_1 = require("../../constants");
var di_container_1 = require("../../di-container");
var express = require("express");
exports.Controller = function (path) {
    return function (target) {
        di_container_1.container.register(target, { lifeTime: 'scoped' });
        var metadata = Reflect.getMetadata(constants_1.endpointMeta, target.prototype);
        var router = express.Router();
        metadata.forEach(function (endpoint) {
            router[endpoint.method](endpoint.path, function (req, res) {
                var ctrl = di_container_1.container.resolve(target, req);
                ctrl[endpoint.name](req, res);
            });
        });
        Reflect.defineMetadata(constants_1.routerMeta, { path: path, router: router }, target);
        return target;
    };
};
exports.Endpoint = function (_a) {
    var method = _a.method, path = _a.path;
    return function (target, name) {
        var metadata = Reflect.getMetadata(constants_1.endpointMeta, target) || [];
        var endpoint = { method: method, path: path, name: name };
        Reflect.defineMetadata(constants_1.endpointMeta, __spreadArrays(metadata, [endpoint]), target);
    };
};
exports.Get = function (_a) {
    var path = _a.path;
    return exports.Endpoint({ method: 'get', path: path });
};
exports.Post = function (_a) {
    var path = _a.path;
    return exports.Endpoint({ method: 'post', path: path });
};
exports.Put = function (_a) {
    var path = _a.path;
    return exports.Endpoint({ method: 'put', path: path });
};
exports.Patch = function (_a) {
    var path = _a.path;
    return exports.Endpoint({ method: 'patch', path: path });
};
exports.Delete = function (_a) {
    var path = _a.path;
    return exports.Endpoint({ method: 'delete', path: path });
};

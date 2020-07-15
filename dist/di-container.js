"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
require("reflect-metadata");
var constants_1 = require("./constants");
var DiContainer = /** @class */ (function () {
    function DiContainer() {
        this.singletons = {};
        this.dependencies = {};
    }
    DiContainer.prototype.register = function (Dependency, options) {
        if (options === void 0) { options = { lifeTime: 'transient' }; }
        this.dependencies[Dependency.name] = {
            options: options,
            Dependency: Dependency,
        };
    };
    DiContainer.prototype.resolve = function (Dependency, scope) {
        var dependencyMapItem = this.dependencies[Dependency.name];
        var instance;
        if (dependencyMapItem.options.lifeTime === 'transient') {
            instance = this.buildDependency(dependencyMapItem.Dependency);
        }
        if (dependencyMapItem.options.lifeTime === 'singleton') {
            instance = this.buildSingleton(dependencyMapItem.Dependency);
        }
        if (dependencyMapItem.options.lifeTime === 'scoped') {
            instance = this.buildScoped(dependencyMapItem.Dependency, scope);
        }
        return instance;
    };
    DiContainer.prototype.buildScoped = function (Dependency, scope) {
        var instance = scope[Dependency.name];
        if (!instance) {
            instance = this.buildDependency(Dependency, scope);
            scope[Dependency.name] = instance;
        }
        return instance;
    };
    DiContainer.prototype.buildSingleton = function (Dependency, scope) {
        var instance = this.singletons[Dependency.name];
        if (!instance) {
            instance = this.buildDependency(Dependency);
            this.singletons[Dependency.name] = instance;
        }
        return instance;
    };
    DiContainer.prototype.buildDependency = function (Dependency, scope) {
        var _this = this;
        var tokens = Reflect.getMetadata(constants_1.paramTypes, Dependency) || [];
        var injections = tokens.map(function (token) { return _this.resolve(token, scope); });
        return new (Dependency.bind.apply(Dependency, __spreadArrays([void 0], injections)))();
    };
    return DiContainer;
}());
exports.container = new DiContainer();

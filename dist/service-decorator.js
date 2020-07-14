"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
var di_container_1 = require("./di-container");
exports.Service = function (options) {
    return function (target) {
        di_container_1.container.register(target, options);
    };
};

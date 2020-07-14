"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressDiConnector = void 0;
var constants_1 = require("../../constants");
function expressDiConnector(app, controllers) {
    controllers.forEach(function (ctrl) {
        var _a = Reflect.getMetadata(constants_1.routerMeta, ctrl), router = _a.router, path = _a.path;
        app.use(path, router);
    });
}
exports.expressDiConnector = expressDiConnector;

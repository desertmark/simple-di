"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = exports.BService = exports.AService = exports.CService = void 0;
var di_container_1 = require("./di-container");
var CService = /** @class */ (function () {
    function CService() {
        this.id = Math.random();
    }
    CService.prototype.test = function () {
        return 'C-' + this.id;
    };
    CService = __decorate([
        di_container_1.Service({ lifeTime: 'transient' })
    ], CService);
    return CService;
}());
exports.CService = CService;
var AService = /** @class */ (function () {
    function AService(c) {
        this.c = c;
        this.id = Math.random();
    }
    AService.prototype.test = function () {
        return 'A-' + this.id + '---' + this.c.test();
    };
    AService = __decorate([
        di_container_1.Service({ lifeTime: 'scoped' }),
        __metadata("design:paramtypes", [CService])
    ], AService);
    return AService;
}());
exports.AService = AService;
var BService = /** @class */ (function () {
    function BService(c) {
        this.c = c;
        this.id = Math.random();
    }
    BService.prototype.test = function () {
        return 'B-' + this.id + '---' + this.c.test();
    };
    BService = __decorate([
        di_container_1.Service({ lifeTime: 'scoped' }),
        __metadata("design:paramtypes", [CService])
    ], BService);
    return BService;
}());
exports.BService = BService;
var TestController = /** @class */ (function () {
    function TestController(a, b) {
        this.a = a;
        this.b = b;
    }
    TestController.prototype.get = function (req, res) {
        res.json({ a: this.a.test(), b: this.b.test() });
    };
    TestController.prototype.getById = function (req, res) {
        res.json({ msg: this.a.test(), id: req.params.id });
    };
    __decorate([
        di_container_1.Get({ path: '/' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], TestController.prototype, "get", null);
    __decorate([
        di_container_1.Get({ path: '/:id' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], TestController.prototype, "getById", null);
    TestController = __decorate([
        di_container_1.Controller('/api'),
        __metadata("design:paramtypes", [AService,
            BService])
    ], TestController);
    return TestController;
}());
exports.TestController = TestController;
// @Service()
// class TestController {
//     constructor(private testService: TestService) {}
//     get() {
//         console.log(this.testService.test());
//     }
// }

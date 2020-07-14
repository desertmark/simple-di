// import express = require('express');
// const app = express() as express.Application;
// import { DiContainer, DiResolver } from "./di-container";
// export class TestService implements TestService {
//     test(): string {
//         return 'test service';
//     }
// }
// export class TestController {
//     private testService: TestService;
//     constructor(testService: TestService) {
//         this.testService = testService;
//     }
//     get(req: any, res: any) {
//         console.log('testing', this.testService.test());
//         res.json({ msg: 'test'});
//     }
// }
// export interface ITestService {
//     test(): void;
// }
// export type Method = 'get' | 'post' | 'delete' | 'put' | 'patch';
// export class RouterBuilder {
//     private router: express.IRouter
//     constructor(private controller: any) {
//         this.router = express.Router();
//     }
//     get(path: string, handler: string) {
//         return this.method('get', path, handler);
//     }
//     post(path: string, handler: string) {
//         return this.method('post', path, handler);
//     }
//     put(path: string, handler: string) {
//         return this.method('put', path, handler);
//     }
//     patch(path: string, handler: string) {
//         return this.method('patch', path, handler);
//     }
//     delete(path: string, handler: string) {
//         return this.method('delete', path, handler);
//     }
//     build(): express.IRouter {
//         return this.router;
//     }
//     private method(method: Method, path: string, handler: string): RouterBuilder {
//         this.router[method](path, (req: any, res) => {
//             const resolver = req.resolver;
//             const controller = new this.controller(resolver);
//             controller[handler](req, res);
//         });
//         return this;
//     }
// }
// const container = new DiContainer();
// container.register('testService', TestService);
// const resolver = container.build();
// function injectorMiddleware(req: any, res: any, next: Function)  {
//     req.resolver = resolver;
//     next();
// }
// app.use(injectorMiddleware);
// const builder = new RouterBuilder(TestController);
// const router = builder.get('/', 'get').build();
// app.use('/', router);
// app.listen(3001, () => console.log('Running on localhost:3001'));

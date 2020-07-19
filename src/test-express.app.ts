import { Service, Controller, Get, expressDiConnector } from './index';
import { Request, Response, Router, Application } from 'express';
import express = require('express');

@Service({ lifeTime: 'transient' })
export class CService {
    private id = Math.random();
    test(): string {
        return 'C-' + this.id;
    }
}


@Service({ lifeTime: 'scoped' })
export class AService {
    private id = Math.random();
    constructor(private c: CService) { }
    test(): string {
        return 'A-' + this.id + '---' + this.c.test();
    }
}

@Service({ lifeTime: 'scoped' })
export class BService {
    private id = Math.random();
    constructor(private c: CService) { }
    test(): string {
        return 'B-' + this.id + '---' + this.c.test();
    }
}


@Controller('/api')
export class TestController  {
    constructor(
        private a: AService,
        private b: BService,
    ) {}

    @Get({ path: '/' })
    get(req: Request, res: Response) {
        res.json({ a: this.a.test(), b: this.b.test() });
    }

    @Get({ path: '/:id' })
    getById(req: Request, res: Response) {
        res.json({ msg: this.a.test(), id: req.params.id });
    }
}


const app: Application = express();

expressDiConnector(app, [TestController]);

app.listen(3001, () => console.log('DI Test app is UP at port 3001/api'));

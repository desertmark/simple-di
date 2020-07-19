import { container } from './di-container';
import { Service } from './service-decorator';
@Service()
export class DepA {

    doSomething() {
        console.log('DepA');
    }
};
@Service()
export class DepB {
    constructor(private a: DepA) {};

    doSomething() {
        this.a.doSomething();
    }
}
@Service()
export class SomeService {
    constructor(private b: DepB) {}

    doSomething() {
        this.b.doSomething();
    }
}

const someService = container.resolve(SomeService);
someService.doSomething();

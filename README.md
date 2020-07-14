# Simple DI 

Simple DI is a Dependency Injection and Inversion of control POC module to manage your dependencies in node js.
It is implented in typescript and has express-js integrations right out of the box

## Getting Started

Lets say you have the following classes:
````ts
class DependencyA { ... }
class DependencyB { 
    constructor(private a: DependencyA) {}

    doSomething() {
        ....
    }
}

class SomeService {

    constructor(private b: DependencyB) {}

    doSomething() {
        ....
    }
}
````

To get your hands on an instance of `SomeService` first you need some how to get a instance of `DependencyB` class which requires an instance of `DependencyA`. Dependencies relations can scalate quickly even on small apps.

With simple DI getting an instance of SomeService is rather easy.
To Get started you need to import the `DiContainer` Class in order to create a container. The main purpose of this class is to resolve the dependencies you will later register in it.

To do it just new up this class and start registering your dependencies using the `register()` method.

````ts
const container = new DiContainer();

container.register(SomeService)
````

Later on wherever you need an instance of `SomeService`

````ts
const someService = container.resolve(SomeService)
someService.doSomething();
````

and that's it, the container will take care of injecting the dependencies and building the instance.


## Lifetime and Scope

Additionally when registering a service you can pass its lifetime, to let the container know when you need a new instance and when you need cached one already created before. There are three lifetimes supported:
- `transient`: The container will return a new instance every time the resolve method is called. Theres no caching here.
- `singleton`: The container will return the same instance every time the resolve method is called. It will create a new instance the first time resolve method is called and cache it forever.
- `scoped`: The container will associate the instance to a given scope, and it will return a new instance everytime the scope changes. It will create an instance if a given scope hasn't one yet and associate it with the scope, and return the same one as long the same scope is given. i.e.: If the scope is a http request object, it will return the same instance for the request.

### How this works?
Well easy, for every dependency you register just pass the `lifeTime` option with one of the previous values.

````ts
container.register(SomeService, { lifeTime: 'scoped' })
````

The default value is `transient`, but if `scoped` value was used, you'll have to provide the scope when calling the resolve method.
Lets say we are ina middleware function where the container is available:
````ts
function middleware(request, response, next) => {
    const scopedSomeService = container.resolve(SomeService, request)
    scopedSomeService.doSomething();
    next();
}
````

The instance returned by the container will be shared for all the other situation where the same request instance is provied.


## Express Integration
If you are working with express you can forget everything explained before and take advantage of the express-js integration decorators provided for evena more simple integration in 3 easy steps.
1. Write your dependencies and use the `Service` decorator to let the container know that's a dependency you want registered 
2. Use the `Controller` decorator along with the `Get`, `Post`, `Put`, `Patch` and `Delete` decorators, to let the integration know how your express-js router should be builded.
3. use `expressDiConnector()` integration function to register the routers in the express-js app

Here's how:

````ts


@Service({ lifeTime: 'scoped' })
export class SomeSerivce {
    doSomething(): string {
        ...
    }
}


@Controller('/api')
export class TestController  {
    constructor(
        private someService: SomeService,
    ) {}

    @Get({ path: '/' })
    get(req: Request, res: Response) {
        res.json({ result: this.someService.doSomething() });
    }

    @Get({ path: '/:id' })
    getById(req: Request, res: Response) {
        res.json({ result: this.someService.doSomething(), id: req.params.id });
    }
}


const app: Application = express();
expressDiConnector(app, [TestController]);

....

app.listen(3001);

````

And that's it!
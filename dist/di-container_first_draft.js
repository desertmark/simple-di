// export interface IResolver {
//     [name: string]: any;
// }
// export class DiContainer {
//     dependencies: any = {};
//     register<T>(name: string, dependency: T) {
//         this.dependencies[name] = dependency;
//     }
//     build(): any {
//         const resolver = new DiResolver(this);
//         Object.keys(this.dependencies).forEach(name => {
//             Object.defineProperty(resolver, name, {
//                 get: () => resolver.resolve(name)
//             });
//         });
//         return resolver;
//     }
// }
// export class DiResolver implements IResolver {
//     constructor(private container: DiContainer) {}
//     resolve<T>(name: string) {
//         const D = this.container.dependencies[name];
//         return new D(this) as T;
//     }
// }

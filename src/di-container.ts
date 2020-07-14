import "reflect-metadata";
import { paramTypes } from "./constants";
export type EndpointMethod =  'get' | 'post' | 'put' | 'patch' | 'delete';
export interface EndpointMetadata {
  path: string;
  name: string;
  method: EndpointMethod;
}
export interface DependencyOptions {
  lifeTime: 'transient' | 'scoped' | 'singleton';
}
export interface DependencyMap {
  [name: string]: {
    options: DependencyOptions;
    Dependency: IDependency<any>;
  };
}

export interface IDependency<T> {
  new(...args): T
}

class DiContainer {
  private singletons: any = {};
  private dependencies: DependencyMap = {};
  register<T>(Dependency: IDependency<T>, options: DependencyOptions = { lifeTime: 'transient' }) {
    this.dependencies[Dependency.name] = {
      options,
      Dependency,
    };
  }

  resolve<T>(Dependency: IDependency<T>, scope?: any): T {
    const dependencyMapItem = this.dependencies[Dependency.name];
    let instance: T;
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
  }

  private buildScoped<T>(Dependency: IDependency<T>, scope: any): T {
    let instance = scope[Dependency.name];
    if (!instance) {
      instance = this.buildDependency(Dependency, scope);
      scope[Dependency.name] = instance;
    }
    return instance;
  }

  private buildSingleton<T>(Dependency: IDependency<T>, scope?: any): T {
    let instance = this.singletons[Dependency.name];
    if (!instance) {
      instance = this.buildDependency(Dependency);
      this.singletons[Dependency.name] = instance;
    }
    return instance;
  }

  private buildDependency<T>(Dependency: IDependency<T>, scope?: any) {
    const tokens = Reflect.getMetadata(paramTypes, Dependency) || [];
    const injections = tokens.map(token => this.resolve(token, scope));
    return new Dependency(...injections);
  }
}

export const container = new DiContainer();

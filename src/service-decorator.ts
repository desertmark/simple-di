import { DependencyOptions, defaultOptions } from "./di-container";
import { container } from './di-container';

export const Service = (options: DependencyOptions = defaultOptions): ClassDecorator => {
  return (target: Function) => {
    container.register(target as any, options);
  }
}
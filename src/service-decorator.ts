import { DependencyOptions } from "./di-container";

import { container } from './di-container';

export const Service = (options?: DependencyOptions): ClassDecorator => {
  return (target: Function) => {
    container.register(target as any, options);
  }
}
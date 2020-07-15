import { Application, Router,  } from 'express';
import { EndpointMetadata, EndpointMethod } from '../../di-container';
import { endpointMeta, routerMeta } from '../../constants';
import {Request, Response } from 'express';
import { container } from '../../di-container';
import express = require('express');

export const Controller = (path: string) => {
    return (target: any) => {
      container.register(target, { lifeTime: 'scoped' });
      const metadata: EndpointMetadata[] = Reflect.getMetadata(endpointMeta, target.prototype);
      const router: Router = express.Router();
      metadata.forEach(endpoint => {
        router[endpoint.method](endpoint.path, (req: Request, res: Response) => {
          const ctrl = container.resolve(target, req);
          ctrl[endpoint.name](req, res);
        });
      });
      Reflect.defineMetadata(routerMeta, { path, router }, target);
      return target;
    }
  }
  
  export interface EndpointAttrs {
    path: string;
    method: EndpointMethod;
  }
  export const Endpoint = ({ method, path }: EndpointAttrs): MethodDecorator => {
    return (target: any, name: string) => {
      const metadata: EndpointMetadata[] = Reflect.getMetadata(endpointMeta, target) || [];
      const endpoint: EndpointMetadata = { method, path, name };
      Reflect.defineMetadata(endpointMeta, [...metadata, endpoint], target);
    }
  }

  export interface MethodAttrs {
    path: string;
  }
  export const Get = ({ path }: MethodAttrs): MethodDecorator => {
    return Endpoint({ method: 'get', path });
  }
  export const Post = ({ path }: MethodAttrs): MethodDecorator => {
    return Endpoint({ method: 'post', path });
  }
  export const Put = ({ path }: MethodAttrs): MethodDecorator => {
    return Endpoint({ method: 'put', path });
  }
  export const Patch = ({ path }: MethodAttrs): MethodDecorator => {
    return Endpoint({ method: 'patch', path });
  }
  export const Delete = ({ path }: MethodAttrs): MethodDecorator => {
    return Endpoint({ method: 'delete', path });
  }
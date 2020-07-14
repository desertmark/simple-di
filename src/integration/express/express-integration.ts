import { Application, Router } from 'express';
import { routerMeta } from '../../constants';
export function expressDiConnector(app: Application | Router, controllers: any[]) {
  controllers.forEach(ctrl => {
    const { router, path } = Reflect.getMetadata(routerMeta, ctrl);
    app.use(path, router);
  });
}

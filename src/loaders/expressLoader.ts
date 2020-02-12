import { Application } from 'express';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { createExpressServer } from 'routing-controllers';

import { authorizationChecker } from '../auth/authorizationChecker';
import { currentUserChecker } from '../auth/currentUserChecker';
import { env } from '../env';
import { RoutingControllersOptions } from 'routing-controllers/RoutingControllersOptions';

export const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
  if (settings) {
    const expressOptions: RoutingControllersOptions = {
      cors: true,
      classTransformer: true,
      routePrefix: env.app.routePrefix,
      defaultErrorHandler: false,
      /**
       * We can add options about how routing-controllers should configure itself.
       * Here we specify what controllers should be registered in our express server.
       */
      controllers: env.app.dirs.controllers,
      middlewares: env.app.dirs.middlewares,
      interceptors: env.app.dirs.interceptors,

      /**
       * class-validator를 활용한 Request Payload 타입 검증
       */
      validation: true,

      // TODO: DB를 사용 안하게 하더라도 Authorization 기능은 쓸 수 있게 개선
      // /**
      //  * Authorization features
      //  */
      // authorizationChecker: authorizationChecker(),
      // currentUserChecker: currentUserChecker(),
    };

    // DB 사용할 경우
    if (env.db.enabled) {
      /**
       * TypeOrm connection
       */
      const connection = settings.getData('connection');
      /**
       * Authorization features
       */
      expressOptions.authorizationChecker = authorizationChecker(connection);
      expressOptions.currentUserChecker = currentUserChecker(connection);
    }

    /**
     * We create a new express server instance.
     * We could have also use useExpressServer here to attach controllers to an existing express instance.
     */
    const expressApp: Application = createExpressServer(expressOptions);

    // Run application to listen on given port
    if (!env.isTest) {
      const server = expressApp.listen(env.app.port);
      settings.setData('express_server', server);
    }

    // Here we can set the data for other loaders
    settings.setData('express_app', expressApp);
  }
};

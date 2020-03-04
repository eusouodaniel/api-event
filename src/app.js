import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import routes from './routes';
import './database';
import sentryConfig from './config/sentry';

class App {
  constructor() {
    this.server = express();
    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.swagger();
    this.exception();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
    this.server.use('/api/v1', routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  swagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'api-event',
          version: '1.0.0',
          description: 'Api created to save events',
        },
        basePath: '/api/v1',
      },
      apis: ['./routes'],
    };

    const specs = swaggerJSDoc(options);
    this.server.use('/', swaggerUi.serve, swaggerUi.setup(specs));
  }

  exception() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.APP_ENV === 'local') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal error' });
    });
  }
}

export default new App().server;

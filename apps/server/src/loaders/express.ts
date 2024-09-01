import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
import sessionLoader from './session';
import routesLoader from './routes';
import { errorHandler, notFound } from '../middlewares';
import passportLoader from './passport';

const expressLoader = (): Express => {
  const app = express();

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 100,
      message:
        'Too many requests from this IP, please try again after 15 minutes'
    })
  );
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true
    })
  );
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());

  sessionLoader(app);
  passportLoader(app);
  routesLoader(app);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default expressLoader;

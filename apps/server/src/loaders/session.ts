import { Express } from 'express';
import session, { SessionOptions } from 'express-session';
import MongoStore from 'connect-mongo';
import config from '../config';

const sessionLoader = (app: Express) => {
  const { MONGO_URI, SESSION_SECRET } = config;
  let sessionStore;
  try {
    sessionStore = MongoStore.create({
      mongoUrl: MONGO_URI
    });
  } catch (e) {
    console.error(`Error while connecting to Session server: ${e}`);
  }

  const sessionObject: SessionOptions = {
    secret: SESSION_SECRET || '',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 60000 * 60 * 24
    }
  };

  if (app.get('env') === 'production' && sessionObject.cookie) {
    app.set('trust proxy', 1);
    sessionObject.cookie.secure = true;
    sessionObject.cookie.httpOnly = true;
  }

  app.use(session(sessionObject));
};

export default sessionLoader;

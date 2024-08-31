import expressLoader from './loaders/express';
import config from './config';
import { connectAndLog } from './loaders/database';

const { PORT, NODE_ENV } = config;

(async () => {
  const app = await expressLoader();
  try {
    await connectAndLog();
    app.listen(PORT, async () => {
      console.log(
        `${NODE_ENV?.toLocaleUpperCase()} Server Listening at PORT: ${PORT}`
      );
    });
  } catch (err) {
    console.error('Could not connect to the server:', err);
  }
})();

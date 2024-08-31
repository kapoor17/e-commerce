import { migrate } from 'drizzle-orm/postgres-js/migrator';
import drizzleConfig from '../../drizzle.config';
import { client, connection } from './index';
import config from '../config';

if (!config.DB_MIGRATING) {
  throw new Error(
    'You must set DB_MIGRATING to "true" when running migrations'
  );
}

const main = async () => {
  await migrate(client, {
    migrationsFolder: drizzleConfig.out!
  });

  connection.end();
};

main();

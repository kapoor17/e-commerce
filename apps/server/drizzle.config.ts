import { defineConfig } from 'drizzle-kit';
import config from './src/config';

const { PGURL } = config;

console.log(PGURL);

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/models/schema',
  out: './src/models/migrations',
  dbCredentials: {
    url: PGURL
  },
  strict: true,
  verbose: true
});

import { defineConfig } from 'drizzle-kit';
import config from './src/config';

const { PGURL } = config;

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/models/auth/schema',
  out: './src/models/auth/migrations',
  dbCredentials: {
    url: PGURL
  },
  strict: true,
  verbose: true
});

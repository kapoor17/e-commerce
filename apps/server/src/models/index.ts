import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '@e_commerce_package/models/schemas';
import postgres from 'postgres';
import config from '../config';

const { DB_SEEDING, DB_MIGRATING, PGURL } = config;

export const connection = postgres(PGURL, {
  max: DB_MIGRATING || DB_SEEDING ? 1 : undefined
});

export const client = drizzle(connection, {
  schema,
  logger: true
});

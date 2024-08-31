import { sql } from 'drizzle-orm';
import { client } from '../models';
import { DatabaseError } from '@e_commerce_package/errors';

export async function connectAndLog() {
  try {
    await client.execute(sql`SELECT NOW() AS now`);
    console.log('Connected to the PostgreSQL Database');
  } catch (err) {
    throw new DatabaseError('Error connecting to the PostgreSQL Database');
  }
}

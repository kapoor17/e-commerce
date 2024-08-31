import { BadRequestError } from '@e_commerce_package/errors';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { ZodError, z } from 'zod';

const stringBoolean = z.coerce
  .string()
  .transform((val) => {
    return val === 'true';
  })
  .default('false');

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(['production', 'development', 'staging'])
    .default('development'),

  PORT: z.coerce.number().default(4000),

  SESSION_SECRET: z.string(),

  MONGO_USERNAME: z.string(),
  MONGO_PASSWORD: z.string(),
  MONGO_DB_NAME: z.string(),
  MONGO_URI: z.string(),

  PGHOST: z.string(),
  PGPORT: z.coerce.number(),
  PGUSER: z.string(),
  PGPASSWORD: z.string(),
  PGDATABASE: z.string(),
  PGURL: z.string(),

  DB_SEEDING: stringBoolean,
  DB_MIGRATING: stringBoolean
});

expand(config());

const logError = (error: ZodError) => {
  let m = '';
  error.issues.forEach((issue) => {
    m += issue.path[0] + '\n';
  });
  return m;
};

try {
  EnvSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    let message = 'Missing required values in .env:\n';
    message += logError(error);
    const e = new BadRequestError(message);
    e.stack = '';
    throw e;
  } else {
    console.error(error);
  }
}

export default EnvSchema.parse(process.env);

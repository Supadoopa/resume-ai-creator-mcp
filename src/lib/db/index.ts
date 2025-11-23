import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Reuse client in dev to avoid exhausting connections during HMR
declare global {
  // eslint-disable-next-line no-var
  var __postgresClient: ReturnType<typeof postgres> | undefined;
}

let _db: ReturnType<typeof drizzle> | undefined;

function getDb() {
  if (_db) return _db;

  const connectionString = process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error('POSTGRES_URL is not set');
  }

  const client = global.__postgresClient ?? postgres(connectionString, {
    max: 1,
    prepare: false,
    ...(connectionString.includes('sslmode=require') ? { ssl: 'require' as const } : {}),
  });

  if (process.env.NODE_ENV !== 'production') global.__postgresClient = client;

  _db = drizzle(client, { schema });
  return _db;
}

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_, prop) {
    return getDb()[prop as keyof ReturnType<typeof drizzle>];
  }
});

export { schema };

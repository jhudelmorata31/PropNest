import 'reflect-metadata';
import { config as loadEnv } from 'dotenv';
import { resolve } from 'path';
import { DataSource } from 'typeorm';
import { getDatabaseConfig } from './database-config';
import { databaseEntities } from './entities';
import { InitialSchema1710000000000 } from './migrations/1710000000000-InitialSchema';

// Anchor the .env lookup to the project root so the TypeORM CLI works from any cwd.
loadEnv({ path: resolve(__dirname, '../../.env') });

const dataSource = new DataSource({
  type: 'mysql',
  ...getDatabaseConfig(),
  entities: databaseEntities,
  migrations: [InitialSchema1710000000000],
  synchronize: false,
});
export default dataSource;

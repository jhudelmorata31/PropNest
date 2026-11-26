import 'reflect-metadata';
import { config as loadEnv } from 'dotenv';
import { resolve } from 'path';
import { DataSource } from 'typeorm';
import { getDatabaseConfig } from './database-config';
import { databaseEntities } from './entities';
import { Category } from '../categories/category.entity';
import { User, UserRole } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

loadEnv({ path: resolve(__dirname, '../../.env') });

async function seed() {
 const db = new DataSource({ type: 'mysql', ...getDatabaseConfig(), entities: databaseEntities, synchronize: false });
 await db.initialize();
 const categories = db.getRepository(Category);
 for (const CategoryName of ['House', 'Condominium', 'Land', 'Commercial']) if (!await categories.findOne({ where: { CategoryName } })) await categories.save({ CategoryName });
 if (process.env.SEED_ADMIN_EMAIL && process.env.SEED_ADMIN_PASSWORD) {
   const users = db.getRepository(User); const Email = process.env.SEED_ADMIN_EMAIL.toLowerCase();
   if (!await users.findOne({ where: { Email } })) await users.save(users.create({ FullName: process.env.SEED_ADMIN_NAME || 'PropNest Administrator', Email, Password: await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD, 12), Role: UserRole.ADMIN }));
 }
 await db.destroy(); console.log('Seed completed');
}
seed().catch(error => { console.error(error); process.exit(1); });

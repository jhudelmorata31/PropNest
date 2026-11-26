# PropNest: Real Estate Property Listing System

ITEC 116 backend prototype using NestJS, TypeScript, TypeORM, MySQL, JWT and bcrypt.

## Features

- Public property and category browsing, property search by location, category and status.
- Registration (always creates a Client) and login with bcrypt password hashes and JWT bearer tokens.
- Admin-only user and category management.
- Agents manage their own listings and property image URLs. Admins can manage any listing/image.
- Clients submit inquiries and can see only their own; agents see inquiries for their listings; admins see/manage all.
- DTO validation, explicit TypeORM migrations, foreign keys, unique constraints and safe user response objects.

## Requirements and setup

Install Node.js 20+ and MySQL 8+. From the project directory:

```sh
npm install
```

Create a MySQL database/user or use the `propnest` database, copy `.env.example` to `.env`, and set credentials plus a long random `JWT_SECRET`. Then apply the schema and sample categories:

```sh
mysql -u root -p < propnest.sql
```

Alternatively create the database first, then run `npm run migration:run`; migrations do not seed sample records. Configure DB connection values in `.env`. For a development admin account, set `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` (at least 8 characters), and optionally `SEED_ADMIN_NAME`, then run `npm run seed`. The seed script inserts sample categories and creates that admin only if credentials are provided. Do not use sample or weak secrets in deployment.

`DB_SYNCHRONIZE` defaults to false. Keep it false and use migrations to avoid accidental schema changes.

## Run

```sh
npm run start:dev
```

The API listens on `http://localhost:3000/api/v1`. Production: `npm run build`, then `npm run start:prod`.

## Authentication

Register at `POST /auth/register` with `{ "fullName": "...", "email": "...", "password": "at-least-8-chars" }`. Registration cannot assign privileged roles. Login at `POST /auth/login`; copy `accessToken` and send `Authorization: Bearer <token>` for protected routes. To create Agent or Admin users, an existing Admin uses `POST /users` with a `role` of `Agent` or `Admin`.

## API endpoints

All paths below are prefixed by `/api/v1`.

| Method | Path | Access |
|---|---|---|
| POST | `/auth/register` | Public, creates Client |
| POST | `/auth/login` | Public |
| GET, POST | `/users` | Admin |
| GET, PATCH, DELETE | `/users/:id` | Admin |
| GET | `/categories` | Public |
| GET | `/categories/:id` | Public |
| POST, PATCH, DELETE | `/categories` or `/categories/:id` | Admin |
| GET | `/properties?location=&categoryId=&status=` | Public |
| GET | `/properties/:id` | Public |
| POST | `/properties` | Agent/Admin |
| PATCH, DELETE | `/properties/:id` | Owning Agent/Admin |
| POST | `/inquiries` | Client |
| GET | `/inquiries`, `/inquiries/:id` | Client's own, Agent's listings, or Admin |
| PATCH | `/inquiries/:id` | Admin |
| DELETE | `/inquiries/:id` | Inquiry owner or Admin |
| GET | `/properties/:propertyId/images` | Public |
| POST | `/properties/:propertyId/images` | Owning Agent/Admin |
| PATCH, DELETE | `/images/:imageId` | Owning Agent/Admin |

The API uses Nest's standard JSON responses and HTTP errors. IDs use integer path parameters. Property status values are `Available`, `Pending`, `Sold`, `Rented`.

## Postman

Import `postman/PropNest.postman_collection.json`. Set collection variables `baseUrl` (default `http://localhost:3000/api/v1`), `token`, `propertyId`, `categoryId`, `inquiryId`, and `imageId`. Register/login, then set `token` to the returned access token. Use admin/agent/client accounts for access-control checks.

## Project structure

```text
src/
  auth/          registration, login, JWT strategy, RBAC
  categories/    category entity and CRUD
  database/      TypeORM data source, initial migration and seed
  images/        property image CRUD
  inquiries/     inquiry CRUD and role-based visibility
  properties/    listing CRUD and search/filter
  users/         user administration
  app.module.ts  database and feature module wiring
  main.ts        API prefix and validation
postman/         importable request collection
docs/            technical project documentation
propnest.sql     importable MySQL schema and categories
```

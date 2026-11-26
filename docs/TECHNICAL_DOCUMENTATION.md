# PropNest Technical Documentation

## Project Overview

PropNest is a backend service for a real estate listing workflow. Clients discover listings and contact an agent; agents maintain their own property listings and images; administrators manage accounts, categories and system wide inquiry data.

## System Analysis

The system has three roles: Admin, Agent and Client. Public users may browse properties/categories and create an account. Authentication creates a Client account by default, preventing privilege escalation through public registration. Agents can only change records they own. Administrators have system management privileges. The implementation covers listing, search/filter, image URL, inquiry and account operations without a frontend.

## System Architecture

```text
Postman / API client
        ↓ HTTP JSON, /api/v1
NestJS Controllers → DTO validation → Services
        ↓ TypeORM repositories and entity relations
MySQL (InnoDB, migrations, foreign keys)
```

Feature modules are Auth, Users, Categories, Properties, Inquiries and Images. `ValidationPipe` rejects unknown input fields and transforms typed values. Passport JWT authenticates bearer tokens; `RolesGuard` and ownership checks enforce access policy in the service layer.

## Database Design

The five main tables are `users`, `categories`, `properties`, `inquiries` and `property_images`. Users own many properties and inquiries; categories classify many properties; properties have many inquiries and images. Foreign keys prevent orphan records. Deleting a property cascades its inquiries and images; deleting a user/category referenced by a property is restricted. Emails and category names are unique. Prices are DECIMAL(13,2); status and role use constrained enum values. See `propnest.sql` and the initial TypeORM migration.

## REST API Design

The API is versioned under `/api/v1` and uses resource paths. GET reads, POST creates, PATCH partially updates and DELETE removes. Public reads cover properties/categories/images. Filter properties with `location`, `categoryId`, and `status` query parameters. DTOs constrain string lengths, email format, URL format, numeric prices, enum values and required fields. Nest returns standard JSON and HTTP status/error responses.

## Authentication and Security

Passwords are bcrypt hashes (cost 12) and are excluded from normal ORM selection. Login performs a bcrypt comparison and returns a signed JWT. Registration forces Client role; an administrator may create Agent/Admin accounts. Protected requests pass `Authorization: Bearer <accessToken>`. Users cannot modify another user's property/image/inquiry records. Production must set a long unique `JWT_SECRET`, use TLS, protect `.env`, and use restricted MySQL credentials. No default privileged account is embedded; the seed creates one only when explicit environment credentials are supplied.

## Backend Implementation

Nest modules separate controllers, services and entities. TypeORM relation decorators mirror foreign keys. Schema changes use the migration at `src/database/migrations/1710000000000-InitialSchema.ts`; automatic synchronization is disabled by default. `src/database/seed.ts` inserts example categories and optionally an admin from `SEED_ADMIN_*` environment variables. `propnest.sql` is an alternative initial schema import.

## API Testing and Validation

Import `postman/PropNest.postman_collection.json`. Configure MySQL and `.env`, apply migration/schema, start the API, register and log in. Use the resulting token and test requests with Client, Agent and Admin accounts to verify unauthorized (401), forbidden (403), validation (400), missing-record (404) and duplicate-email/category (409) cases. This workspace did not have Node.js/npm available, so build and live database/Postman verification remain to be run on a Node/MySQL machine; the collection is a test plan, not evidence of passing requests.

## Conclusion

The project supplies the requested backend structure and CRUD workflows using the specified stack. Before presentation, install Node.js/MySQL, run migrations, execute the collection, and resolve any environment-specific build/runtime issues.

## References

- NestJS documentation: https://docs.nestjs.com/
- TypeORM documentation: https://typeorm.io/
- MySQL 8.0 Reference Manual: https://dev.mysql.com/doc/refman/8.0/en/
- Passport JWT strategy: https://www.passportjs.org/packages/passport-jwt/
- bcrypt npm package: https://www.npmjs.com/package/bcrypt
- Postman documentation: https://learning.postman.com/docs/

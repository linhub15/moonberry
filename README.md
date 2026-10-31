# SaaSKit

A modern SaaS starter built with TanStack Start, React 19, Tailwind CSS 4, Better Auth, Drizzle ORM, PostgreSQL, PostHog, Storybook, and Vitest.

## Requirements

- Node.js 22.12 or newer
- pnpm 12.8.1
- Docker

## Local setup

1. Copy `.env.example` to `.env` and replace the authentication and PostHog placeholders.
2. Install dependencies with `pnpm install`.
3. Start PostgreSQL with `pnpm db:up`.
4. Apply the database schema with `pnpm drizzle migrate`.
5. Start the app with `pnpm dev`.

Run any Drizzle Kit command through `pnpm drizzle`, such as `pnpm drizzle generate`, `pnpm drizzle migrate`, or `pnpm drizzle studio`. Use `pnpm drizzle push` only for disposable local databases; committed environments should use migrations.

The `.env` file is the single source for local database configuration. Its `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, and `POSTGRES_PORT` values configure the Docker container, while `DATABASE_URL` supplies the matching connection to the app and Drizzle Studio. When changing the local database settings, update the corresponding parts of `DATABASE_URL` too. In serverless environments, only `DATABASE_URL` is required.

Use `pnpm db:status` to inspect the PostgreSQL container and `pnpm db:down` to stop it. Database data persists in the `postgres_data` Docker volume between restarts. PostgreSQL only applies username, password, and database changes when initializing a new volume.

## Quality checks

- `pnpm check` runs typechecking, linting, formatting checks, tests, and the production build.
- `pnpm storybook` starts the component workshop.
- `pnpm build-storybook` verifies the static Storybook build.

Server secrets and database access stay behind TanStack Start's server-only import boundary. Client-visible configuration must use the `VITE_` prefix; never expose database or authentication secrets that way.

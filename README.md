## Quick Start

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Bun](https://bun.com/)
- [Docker](https://www.docker.com/products/docker-desktop/)

**Installation**

Install the project dependencies using bun:

```sh
bun install
```

**Running the Project**

```sh
bun run start:dev
```

## Backend

apps/backend

**Environment Variables**

Copy the file named `.env.example` and rename it `.env.development` in the root of your project and replace the placeholder values with yours.

**Database**

Start the database container using docker:

```sh
bun run start:dev:db
```

## Frontend

apps/frontend

**Environment Variables**

Copy the file named `.env.example` and rename it `.env.local` in the root of your project and replace the placeholder values with yours.

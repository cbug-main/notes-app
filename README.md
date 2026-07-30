# Notes App API

A RESTful backend for a notes-taking application, built with Express and SQLite. It handles authentication and lets users manage their own notes — including image uploads, search, and pagination.

## Overview

This API allows a user to:

- Register and log in to receive a JWT
- Delete their own account
- Create, update, retrieve, and delete personal notes
- Upload images attached to notes
- Search and paginate through their notes

Every notes route is protected — a valid JWT (from `/auth/register` or `/auth/login`) must be sent in the `Authorization` header.

## Tech Stack

| Package | Purpose |
|---|---|
| Express | Server and routing |
| better-sqlite3 | Embedded SQLite database |
| jsonwebtoken | Authentication |
| bcrypt | Password hashing |
| Zod | Request validation |
| Multer | Image uploads (multipart/form-data) |

## Project Structure

```
notes-app/
├── controller/
│   ├── authControllers.js
│   └── noteControllers.js
├── database/
│   ├── db.js
│   └── notes.db
├── middleware/
│   ├── verifyToken.js
│   └── validate.js
├── schemas/
│   ├── registerSchema.js
│   ├── loginSchema.js
│   └── noteSchema.js
├── routes/
│   ├── authRoutes.js
│   └── notesRoutes.js
├── uploads/            # note images
├── src/
│   └── app.js
├── .env
└── package.json
```

## API Endpoints

### Auth — `/auth`

| Method | Endpoint | Auth required | Description |
|---|---|---|---|
| POST | `/auth/register` | No | Create a new user, returns JWT |
| POST | `/auth/login` | No | Log in, returns JWT |
| DELETE | `/auth/remove` | Yes | Delete the logged-in user |

### Notes — `/notes`

All notes routes require `Authorization: Bearer <token>`.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/notes` | Get all notes for the current user |
| POST | `/notes` | Create a new note |
| GET | `/notes/:id` | Get a single note by ID |
| PUT | `/notes/:id` | Update a note |
| DELETE | `/notes/:id` | Delete a note |

### Query Parameters

`/notes` supports pagination and search, which can be combined:

```
GET /notes?page=2&limit=10
GET /notes?search=javascript
GET /notes?page=1&limit=5&search=project
```

## Getting Started

**Requirements:** Node.js v18+

```bash
git clone <repo-url>
cd notes-app
npm install
```

Create a `.env` file in the project root:

```
PORT=5000
JWT_SECRET=your_secret_key_here
```

Then run:

```bash
npm start
```

The server starts on `http://localhost:5000` (or your configured `PORT`). SQLite tables are created automatically on first run.

## Roadmap

**Completed:** JWT auth, notes CRUD, authorization checks, Zod validation, image uploads (Multer), search, pagination

**Planned:** Refresh tokens, Prisma ORM migration, PostgreSQL, Docker, automated testing, API documentation, deployment

## Frontend

This repo is backend-only, designed to be paired with a separate frontend client.

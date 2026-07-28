# Notes App API

A lightweight RESTful backend for a notes-taking application, built with Express and SQLite. It handles user registration/authentication and lets authenticated users create and retrieve personal notes.

## Overview

This API allows a user to:

- Register an account and log in to receive a JWT
- Delete their own account
- Create notes tied to their account
- Retrieve all of their notes, or a single note by ID

Every notes route is protected — a valid JWT (obtained from `/auth/register` or `/auth/login`) must be sent in the `Authorization` header to access it.

## Tech Stack

- **Node.js** / **Express** — server and routing
- **better-sqlite3** — embedded SQL database, no separate DB server required
- **jsonwebtoken (JWT)** — stateless authentication
- **bcrypt** — password hashing

## Project Structure

```
notes-app/
├── controller/
│   ├── authControllers.js   # register, login, remove
│   └── noteControllers.js   # createNote, getNotes, getANote
├── database/
│   ├── db.js                 # SQLite connection + table setup
│   └── notes.db
├── middleware/
│   └── verifyToken.js        # JWT verification middleware
├── routes/
│   ├── authRoutes.js
│   └── notesRoutes.js
├── src/
│   └── app.js                 # app entry point
├── uploads/                   # (reserved for future image uploads)
├── .env
└── package.json
```

## API Endpoints

### Auth (`/auth`)

| Method | Endpoint          | Auth required | Description                    |
|--------|--------------------|:--------------:|--------------------------------|
| POST   | `/auth/register`   | No             | Create a new user, returns JWT |
| POST   | `/auth/login`       | No             | Log in, returns JWT            |
| DELETE | `/auth/remove`      | Yes            | Delete the logged-in user      |

### Notes (`/notes`)

All notes routes require a valid JWT.

| Method | Endpoint      | Description                     |
|--------|---------------|----------------------------------|
| GET    | `/notes`       | Get all notes for the current user |
| POST   | `/notes`       | Create a new note                |
| GET    | `/notes/:id`   | Get a single note by ID          |

### Authentication

Send the token in the request header:

```
Authorization: Bearer <token>
```

## Getting Started

### Prerequisites

- Node.js (v18+)

### Installation

```bash
git clone <repo-url>
cd notes-app
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
PORT=5000
JWT_SECRET=your_secret_key_here
```

### Running the app

```bash
npm start
```

The server starts on `http://localhost:5000` (or the `PORT` you set). The SQLite database and tables are created automatically on first run.

## Roadmap

Planned improvements:

- Update / delete note
- Input validation
- Image upload for notes
- Search
- Pagination
- Refresh tokens

## Frontend

This repo is backend-only. It's designed to be paired with a separate frontend client that consumes these endpoints.

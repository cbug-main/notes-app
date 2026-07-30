# Notes App API

A RESTful backend API for a notes-taking application built with Express and SQLite.

The API supports user authentication, protected note management, validation, image uploads, searching, and pagination.

## Overview

This API allows users to:

- Register an account and authenticate using JWT
- Create, update, retrieve, and delete personal notes
- Upload images attached to notes
- Search notes by title and content
- Retrieve notes using pagination
- Access only their own resources through authorization checks

Every notes route is protected. A valid JWT must be provided in the Authorization header.

---

# Tech Stack

- Node.js / Express
  - Server framework and routing

- better-sqlite3
  - Embedded SQLite database

- jsonwebtoken (JWT)
  - Authentication and route protection

- bcrypt
  - Password hashing

- Zod
  - Request validation

- Multer
  - Multipart/form-data handling and image uploads

---

# Project Structure


notes-app/
├── controller/
│ ├── authControllers.js
│ └── noteControllers.js
│
├── database/
│ ├── db.js
│ └── notes.db
│
├── middleware/
│ ├── verifyToken.js
│ └── validate.js
│
├── schemas/
│ ├── registerSchema.js
│ ├── loginSchema.js
│ └── noteSchema.js
│
├── routes/
│ ├── authRoutes.js
│ └── notesRoutes.js
│
├── uploads/
│ └── note images
│
├── src/
│ └── app.js
│
├── .env
└── package.json


---

# API Endpoints

## Auth `/auth`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive JWT |
| DELETE | `/auth/remove` | Delete current user |

---

## Notes `/notes`

All notes endpoints require:


Authorization: Bearer <token>


| Method | Endpoint | Description |
|---|---|---|
| GET | `/notes` | Get user's notes |
| POST | `/notes` | Create a note |
| GET | `/notes/:id` | Get a single note |
| PUT | `/notes/:id` | Update a note |
| DELETE | `/notes/:id` | Delete a note |

---

# Query Features

The notes endpoint supports:

## Pagination

Example:


GET /notes?page=2&limit=10


Returns notes from the requested page.

## Search

Example:


GET /notes?search=javascript


Searches through note titles and content.

Search and pagination can be combined:


GET /notes?page=1&limit=5&search=project


---

# Authentication

JWT tokens are sent through the Authorization header:


Authorization: Bearer <token>


Protected routes verify the token before allowing access.

---

# Getting Started

## Requirements

- Node.js v18+

## Installation

```bash
git clone <repo-url>
cd notes-app
npm install
Environment Variables

Create a .env file:

PORT=5000
JWT_SECRET=your_secret_key_here
Running
npm start

The server starts on:

http://localhost:5000

SQLite database tables are created automatically.

Roadmap

Completed:

JWT authentication
Notes CRUD
Authorization checks
Zod validation
Image uploads with Multer
Search functionality
Pagination

Planned:

Refresh token authentication
Prisma ORM migration
PostgreSQL database
Docker containerization
Automated testing
API documentation
Deployment
Future Frontend

This repository contains only the backend API.

A separate frontend client can consume these endpoints.


---

One thing I want to point out: your roadmap order is becoming very good. You are naturally moving from **building features** → **learning backend architecture**.

The next refresh-token step will probably be the first one where you feel "wait, this is not just adding an endpoint anymore." That's where backend starts getting spicy. 🌶️
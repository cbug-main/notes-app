# 📝 Notes App API

A RESTful backend for a notes-taking application, built with Express and SQLite. It handles authentication and lets users manage their own notes — including image uploads, search, and pagination.

![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white)
![Status](https://img.shields.io/badge/status-complete-brightgreen)

---

## 📌 Overview

This API allows a user to:

- ✅ Register and log in to receive an access token and a refresh token
- 🔁 Refresh their access token using token rotation
- ❌ Delete their own account
- 🗒️ Create, update, retrieve, and delete personal notes
- 🖼️ Upload images attached to notes
- 🔍 Search and paginate through their notes

> Every notes route is protected — a valid access token (from `/auth/register` or `/auth/login`) must be sent in the `Authorization` header.

---

## 🛠️ Tech Stack

| Package | Purpose |
|---|---|
| **Express** | Server and routing |
| **better-sqlite3** | Embedded SQLite database |
| **jsonwebtoken** | Authentication (access + refresh tokens) |
| **bcrypt** | Password hashing |
| **Zod** | Request validation |
| **Multer** | Image uploads (multipart/form-data) |
| **dotenv** | Environment variable management |

---

## 📂 Project Structure

```
notes-app/
├── controller/
│   ├── authControllers.js
│   └── noteControllers.js
├── database/
│   ├── db.js
│   └── notes.db
├── middleware/
│   ├── upload.js
│   ├── validate.js
│   ├── verifyRefreshToken.js
│   └── verifyToken.js
├── routes/
│   ├── authRoutes.js
│   └── notesRoutes.js
├── schemas/
│   ├── loginSchema.js
│   ├── noteSchema.js
│   └── registerSchema.js
├── src/
│   └── app.js
├── uploads/
│   └── notes/          # note images
├── .env
├── .gitignore
└── package.json
```

---

## 🔐 Authentication

This API uses a **two-token system**:

- **Access token** — short-lived, sent with every request to protected routes via the `Authorization` header.
- **Refresh token** — longer-lived, used solely to obtain a new access token when the old one expires.

**Refresh token rotation:** each time a refresh token is redeemed for a new access token, it is invalidated and replaced with a new refresh token. This limits the damage a leaked refresh token can do, since a reused (stale) token is rejected.

---

## 📡 API Endpoints

### 🔑 Auth — `/auth`

| Method | Endpoint | Auth required | Description |
|---|---|---|---|
| `POST` | `/auth/register` | No | Create a new user, returns access + refresh tokens |
| `POST` | `/auth/login` | No | Log in, returns access + refresh tokens |
| `POST` | `/auth/refresh` | Refresh token | Rotates the refresh token and returns a new access token |
| `DELETE` | `/auth/remove` | Yes | Delete the logged-in user |

### 🗒️ Notes — `/notes`

All notes routes require `Authorization: Bearer <access_token>`.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/notes` | Get all notes for the current user |
| `POST` | `/notes` | Create a new note |
| `GET` | `/notes/:id` | Get a single note by ID |
| `PUT` | `/notes/:id` | Update a note |
| `DELETE` | `/notes/:id` | Delete a note |

### 🔎 Query Parameters

`/notes` supports pagination and search, which can be combined:

```
GET /notes?page=2&limit=10
GET /notes?search=javascript
GET /notes?page=1&limit=5&search=project
```

---

## 🚀 Getting Started

**Requirements:** Node.js v18+

```bash
git clone <repo-url>
cd notes-app
npm install
```

Create a `.env` file in the project root:

```
PORT=5000
JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
```

Then run:

```bash
npm start
```

The server starts on `http://localhost:5000` (or your configured `PORT`). SQLite tables are created automatically on first run.

---

## ✅ Status

**This project is complete.** Implemented: access + refresh token authentication with refresh token rotation, notes CRUD, authorization checks, Zod validation, image uploads (Multer), search, and pagination.

---

## 🖥️ Frontend

This repo is **backend-only**, designed to be paired with a separate frontend client.

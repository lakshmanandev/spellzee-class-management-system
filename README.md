# Spellzee Class Management System

A full-stack class management application for administrators and students. It supports secure role-based access, student/class operations, attendance tracking, and student-specific real-time scheduling notifications.

## Stack

- React + Vite, React Router, Axios, Socket.IO client
- Node.js + Express, MongoDB + Mongoose, Socket.IO
- JWT authentication, bcrypt password hashing, Zod validation

## Features

- Admin and student JWT login/logout with protected role-specific routes
- Student CRUD (deactivation is used instead of irreversible deletion), server/client validation and search
- Class scheduling, editing, filtering, cancellation and attendance marking
- API-backed admin summary cards and student dashboard
- Private Socket.IO rooms (`student:<id>`) for new-class notifications and live dashboard updates
- Responsive dashboard UI, loading/empty/error states and confirmation before deactivation/cancellation

## Structure

```
client/src/        React app: pages, reusable components, auth context, API client
server/src/
  models/          User and Class Mongoose models
  services/        Authentication, student and class business operations
  controllers/     Thin HTTP adapters
  middleware/      JWT/auth role checks, validation and error handling
  routes/          REST route definitions
  sockets/         Authenticated student room setup
```

## Models

`User` holds admins and students. It has a role, active/inactive status, course/contact fields and a `passwordHash`; passwords are never stored in plain text. `Class` references a student and stores course, teacher, date, time, status and attendance. Indexed fields include email, student ID, date and status.

## API overview

| Method | Endpoint | Access |
| --- | --- | --- |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Signed-in user |
| GET/POST | `/api/students` | Admin |
| GET/PUT/DELETE | `/api/students/:id` | Admin |
| GET/POST | `/api/classes` | Admin |
| GET/PUT | `/api/classes/:id` | Admin |
| PATCH | `/api/classes/:id/cancel` | Admin |
| PATCH | `/api/classes/:id/attendance` | Admin |
| GET | `/api/dashboard/admin` | Admin |
| GET | `/api/dashboard/student` | Student |

## Local setup

1. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI`, `JWT_SECRET`, and URLs. Copy `client/.env.example` to `client/.env` if the defaults do not apply.
2. Install dependencies: `npm install`
3. Seed MongoDB: `npm run seed`
4. Start both applications: `npm run dev`
5. Open `http://localhost:5173`.

## Demo credentials

| Role | Email | Password |
| --- | --- | --- |
| Admin | admin@spellzee.com | Admin@123 |
| Student | aarav@spellzee.com | Student@123 |
| Student | ananya@spellzee.com | Student@123 |

## Authentication and real-time flow

The login endpoint verifies bcrypt hashes and returns a signed, expiring JWT. The client sends it as a Bearer token, and the API verifies it before assigning `req.user`; role middleware then protects every admin/student route. Socket connections authenticate with the same token. Only student sockets join their own `student:<id>` room. When an admin schedules a class, the server persists it, then emits `class:scheduled` only to that room. The student dashboard displays a toast and adds it to upcoming classes immediately.

## Deployment

Deploy `client` to Vercel/Netlify and set `VITE_API_URL`/`VITE_SOCKET_URL` to the deployed API. Deploy `server` to Render/Railway, configure `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CLIENT_URL` and `PORT`, and allow the frontend URL in CORS. Use MongoDB Atlas for production and run `npm run seed` only against a non-production demo database.

## Technical decisions and next steps

Business rules stay in services, controllers only translate HTTP requests, and a single User model keeps role handling explainable. Further production improvements could include refresh-token cookies, pagination/audit logs, a teacher model, automated API/e2e tests, and a background job for class reminders.

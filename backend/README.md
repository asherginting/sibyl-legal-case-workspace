# Sibyl Legal Case Workspace Backend

Backend API for **Sibyl Legal Case Workspace**.

This service handles:
- Authentication (cookie-based JWT)
- Legal case management
- Lawyer access requests & approvals
- Document upload & download
- Role-based access control (Client & Lawyer)

The backend is designed to be **production-ready** and supports both local development and deployed environments.

---

## Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **JWT (HTTP-only Cookie Authentication)**
- **Multer** (file upload)
- **Swagger / OpenAPI 3.0**

---

### Requirements

- Node.js ≥ 18
- pnpm ≥ 8
- PostgreSQL
- Docker (for local and production)

---

## Installation

```bash
pnpm install
```

---

## Environment Variables

Create a `.env` file in the `backend` folder:

```env
PORT=4000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/sibyl
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=15m
```

> ⚠️ Never commit `.env` to version control.

---

## Database Setup (Prisma)

Run migrations:

```bash
pnpm prisma migrate dev
```

Generate Prisma client:

```bash
pnpm prisma generate
```

(Optional) Seed database:

```bash
pnpm prisma db seed
```

---

Default Seed Accounts
When seeding the database, the following users are created:

| Role   | Email                                     | Password   |
| ------ | ----------------------------------------- | ---------- |
| Client | [client@sibyl.sg](mailto:client@sibyl.sg) | Testing123 |
| Lawyer | [lawyer@sibyl.sg](mailto:lawyer@sibyl.sg) | Testing123 |

These accounts can be used for testing authentication and role-based access.


## Running the Server

Development mode:

```bash
pnpm dev
```

Server will run at:

```
http://localhost:4000
```

Health check:

```
GET /health
```

---

## API Documentation (Swagger)

Swagger UI is available at:

```
http://localhost:4000/docs
```

Swagger can be used **as a Postman replacement**:

* Login once
* Cookies are stored automatically
* All protected endpoints can be tested directly

In production, Swagger is available at:

https://sibyl-legal-case-workspace-production.up.railway.app/docs


---

## Authentication

Authentication uses **JWT stored in HTTP-only cookies**.

Cookie Behavior
Cookie configuration differs by environment:

| Environment | sameSite | secure |
| ----------- | -------- | ------ |
| Development | lax      | false  |
| Production  | none     | true   |

This allows:

Local development without HTTPS

Secure cross-site authentication in production (Vercel ↔ Railway)


### Login

```
POST /auth/login
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

On success, an `auth_token` cookie is set.

### Get Current User

```
GET /auth/me
```
Returns the currently authenticated user.

### Logout

```
POST /auth/logout
```
Clears the authentication cookie.

---

## Case Management

### Browse Cases

```
GET /cases
```

Supports filters:

* `page`
* `limit`
* `search`
* `category`
* `jurisdiction`
* `posted` (7d / 30d)
* `sort` (recent / oldest)

### Create Case (CLIENT only)

```
POST /cases
```

### Get Case Detail

```
GET /cases/{caseId}
```

### Update Case (CLIENT only)

```
PATCH /cases/{caseId}
```

### Delete Case (CLIENT only)

```
DELETE /cases/{caseId}
```

### Grant Lawyer Access (CLIENT only)

```
POST /cases/{caseId}/access/grant
```

### Revoke Lawyer Access (CLIENT only)

```
DELETE /cases/{caseId}/access/{lawyerId}
```

---

## Case Access (LAWYER)

### Request Access

```
POST /cases/{caseId}/access/request
```

### Withdraw Access

```
POST /cases/{caseId}/access/withdraw
```

---

## Documents

### List Documents

```
GET /cases/{caseId}/documents
```

### Upload Document

```
POST /cases/{caseId}/documents
```

* Content-Type: `multipart/form-data`
* Field name: `file`
* Max size: 5MB
* Allowed types:

  * PDF
  * DOCX
  * PNG
  * JPG / JPEG

### Download Document

```
GET /cases/{caseId}/documents/{documentId}
```

---

## Project Structure

```txt
backend
├── prisma
│   ├── migrations
│   ├── schema.prisma
│   └── seed.ts
├── src
│   ├── auth
│   ├── cases
│   ├── documents
│   ├── docs          # Swagger / OpenAPI
│   └── index.ts
├── uploads
├── .env.example
├── package.json
└── tsconfig.json
```

---

## Notes

* Authentication is cookie-based (no Authorization header).
* Swagger UI is configured with `withCredentials` to support cookies.
* File uploads are stored locally in `/uploads`.
* Access control is enforced at the service layer.
* This backend is designed to be consumed by a frontend running on `localhost:3000`.

---

## License

ISC

# Sibyl Legal Case Workspace Frontend

Frontend application for **Sibyl Legal Case Workspace**, built using **Next.js App Router**.

This application allows:
- Clients to create and manage legal cases
- Lawyers to browse cases and request access
- Secure authentication using HTTP-only cookies

The frontend is designed to work together with the backend API and demonstrates secure, production-ready frontend–backend integration.

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS

---

## Features

- 🔐 Cookie-based authentication (no localStorage tokens)
- 🧑‍⚖️ Role-based UI (Client & Lawyer)
- 📂 Case browsing and filtering
- 📄 Document upload & download
- 🌍 Production-ready deployment on Vercel

---

## Environment Variables

Create a `.env.local` file in the `frontend` directory.

### Local Development

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

### Production Development

```env
NEXT_PUBLIC_API_BASE_URL=https://sibyl-legal-case-workspace-production.up.railway.app
```
All API requests must include credentials to support cookie-based authentication.


Authentication Notes

- Authentication is handled via HTTP-only cookies

- Cookies are set by the backend on login

- Frontend requests must include credentials: "include"

- No authentication data is stored in browser storage


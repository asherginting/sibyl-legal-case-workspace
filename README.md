# Sibyl Legal Case Workspace

A full-stack legal case management platform designed to simulate **real-world client–lawyer collaboration workflows**.

This project demonstrates **production-ready full-stack engineering**, including secure authentication, role-based access control, document management, and modern cloud deployment.

---

## 🚀 Live Demo

- **Frontend (Vercel)**  
  https://sibyl-legal-case-workspace-frontend.vercel.app

- **Backend API (Railway)**  
  https://sibyl-legal-case-workspace-production.up.railway.app

- **API Documentation (Swagger)**  
  https://sibyl-legal-case-workspace-production.up.railway.app/docs

---

## 🏗 Architecture Overview

```txt
Browser (Next.js Frontend)
        |
        | HTTPS (cookie-based authentication)
        v
Backend API (Express + Prisma)
        |
        v
PostgreSQL Database
```

✨ Key Features

- 🔐 Secure authentication using HTTP-only cookies

- 🧑‍⚖️ Role-based access control (Client & Lawyer)

- 📂 Case lifecycle management

- 📄 Document upload & download with access control

- 🧾 Swagger-powered API documentation

- 🌍 Production deployment with proper CORS & SameSite handling

## 🛠 Tech Stack
Frontend

- Next.js (App Router)

- TypeScript

- Tailwind CSS

Backend

- Node.js + Express

- TypeScript

- Prisma ORM

- PostgreSQL

- JWT (HTTP-only cookies)

Infrastructure

- Frontend: Vercel

- Backend: Railway

Database: Railway PostgreSQL

👤 Default Test Accounts

The database seed creates the following users:

| Role   | Email                                     | Password   |
| ------ | ----------------------------------------- | ---------- |
| Client | [client@sibyl.sg](mailto:client@sibyl.sg) | Testing123 |
| Lawyer | [lawyer@sibyl.sg](mailto:lawyer@sibyl.sg) | Testing123 |

👨‍💻 Author

Asher Azriel Ginting

import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

import { loginHandler, meHandler, logoutHandler } from './auth/auth.controller'
import { requireAuth } from './auth/auth.middleware'
import { browseCasesHandler } from './cases/cases.controller'

dotenv.config()
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())


app.post('/auth/login', loginHandler)
app.post('/auth/logout', logoutHandler)
app.get('/auth/me', requireAuth, meHandler)
app.get('/cases', requireAuth, browseCasesHandler)

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});

import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import scheduleRoutes from './routes/scheduleRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import userRoutes from "./routes/userRoutes.js";

config();

const app = express();
app.use(json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(session({
  secret: '123321',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/', scheduleRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/notes", notesRoutes)

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
app.listen(PORT, HOST, () => {
  console.log(`Server running on port ${PORT} \nhttp://${HOST}:${PORT}`)
});

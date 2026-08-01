import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dataBaseConnection from './config/db.js';
import router from './routers/bookRouter.js';
import cookieParser from 'cookie-parser';

dotenv.config();
dataBaseConnection();

const app = express();
const PORT_NUMBER = process.env.PORT || 5001;
const allowedOrigins: string[] = process.env.ALLOWED_ORIGINS?.split(',') ?? [];

app.set('trust proxy', 1);
app.use(cookieParser());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

app.use('/api', router);

app.listen(PORT_NUMBER, () => {
  console.log(`Listening port ${PORT_NUMBER}`);
});

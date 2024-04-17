import 'dotenv/config';

import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { DATABASE_URL } from './config';
import errorHandler from './middlewares/error-handler';
import routes from './routes';

const { SERVER_PORT = 3000 } = process.env;
const app = express();
mongoose.connect(DATABASE_URL);

app.use(cors({
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: '*',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);
app.use(errors());
app.use(errorHandler);

app.listen(Number(SERVER_PORT), () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${SERVER_PORT}`);
});

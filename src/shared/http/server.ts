import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors'
import routes from './routes';
import AppErro from '@shared/erros/AppError';
import '@shared/typeorm'
import { errors } from 'celebrate'


const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(
  (
    error: Error,
    resquest: Request,
    response: Response,
    next: NextFunction,
  ) => {
    if (error instanceof AppErro) {
      return response.status(error.statusCode).json({
        status: 'error',
        message:error.message
      })
    }
    return response.status(500).json({
      status: 'error',
      message:'internal server error'
    })
  },
);

app.listen(3001, () => {
  console.log('eai brother');
});

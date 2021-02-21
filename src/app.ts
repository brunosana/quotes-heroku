import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import routes from './routes';
import AppError from './errors/AppError';

const app = express();

dotenv.config();

app.use(express.json());

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'Error',
            message: err.message,
        });
    }

    // eslint-disable-next-line
    console.error(err.message);

    return response.status(500).json({
        status: 'Error',
        message: 'Internal server error',
    });
});
export default app;

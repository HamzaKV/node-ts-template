import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import logger from 'morgan';
import indexRouter from './routes';
import { TObject } from './types';

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

/**Error Routes */
app.use((_req: Request, _res: Response, next: NextFunction) => {
    const error = {
        status: 404,
        data: 'Not Found',
    };
    next(error);
});

app.use((response: { status: number; data: TObject }, _req: Request, res: Response, _next: NextFunction) => {
    if (response?.status >= 400 && response?.status <= 599) {
        res.status(response.status).json({
            error: response.data,
        });
    } else {
        res.status(response?.status ?? 200).json({
            data: response.data,
        });
    }
});

export default app;
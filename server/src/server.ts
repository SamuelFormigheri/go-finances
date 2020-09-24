import 'reflect-metadata';
import express, { Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import routes from './routes/index';
import cors from 'cors';

import './database';

import uploadConfig from './config/upload';
import AppError from './errors/AppError';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/files', express.static(uploadConfig.directory));

app.use("/", routes);

//Tratativa de erros global
app.use((err: Error, request: Request, response: Response, next: NextFunction) =>{
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
});

app.listen(3333);
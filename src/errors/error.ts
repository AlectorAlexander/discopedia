import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ErrorTypes, errorCatalog } from './catalog';

interface Error {
  name: string;
  status?: number,
  message: string;
  stack?: string;
}

const errorHandler: ErrorRequestHandler = ( 
    err: Error | ZodError, 
    _req,
    res,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next,
) => {
    if (err instanceof ZodError) {
        const { message } = err.issues[0];
    
        return res.status(400).json({ message });
    }
    const messageAsErrorType = err.message as keyof typeof ErrorTypes;

    const mappedError = errorCatalog[messageAsErrorType];
    if (mappedError) {
        const { httpStatus, message } = mappedError;
        return res.status(httpStatus).json({ error: message });
    }
    
    const { message } = err;
  
    const noMessage = message || 'Internal Error';
    if (err.status) {
        const { status } = err;
        return res.status(status).json({ message: noMessage });
    }
    const status =  500;

    return res.status(status).json({ message: noMessage });
};

export default errorHandler;
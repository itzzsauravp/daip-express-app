import type { NextFunction, Request, Response } from 'express';
import { BaseError, ValidationError } from '../errors/errors';
import { HTTP_STATUS } from '../../domain/constants/http.constants';
import { Prisma } from '../../../generated/prisma/client';

export default function ErrorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
    let statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    let responseBody: { success: boolean; message: string; errors?: any } = {
        success: false,
        message: err.message || 'Internal Server Error',
    };

    if (err instanceof ValidationError) {
        const flattenedError = {};
        err.getOriginalErrorStack().map((item) => {
            item.issues.map((innerItem) => {
                flattenedError[innerItem.path[0]] = innerItem.message;
            });
        });
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
            success: false,
            message: 'Validation failed',
            errors: flattenedError,
        });
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case 'P2002':
                statusCode = HTTP_STATUS.CONFLICT;
                responseBody.message = `Unique constraint failed on: ${err.meta?.target}`;
                break;
            case 'P2025':
                statusCode = HTTP_STATUS.NOT_FOUND;
                responseBody.message = 'The requested record does not exist.';
                break;
            case 'P2003':
                statusCode = HTTP_STATUS.BAD_REQUEST;
                responseBody.message = 'Foreign key constraint failed. Related record not found.';
                break;
            default:
                statusCode = HTTP_STATUS.BAD_REQUEST;
                responseBody.message = 'A database constraint error occurred.';
        }
        return res.status(statusCode).json(responseBody);
    }

    if (err instanceof Prisma.PrismaClientInitializationError) {
        return res.status(HTTP_STATUS.SERVICE_UNAVAILABLE).json({
            success: false,
            message: 'Database is currently unreachable. Please try again later.',
        });
    }

    if (err instanceof BaseError) {
        return res.status((err as any).statusCode || 400).json({
            success: false,
            message: err.message,
        });
    }

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
    });
}

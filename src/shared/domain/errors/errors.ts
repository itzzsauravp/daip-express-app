import { HTTP_STATUS } from '../constants/http.constants';
import { ZodError } from 'zod';

export class BaseError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}

export class NotFoundError extends BaseError {
    constructor(message: string = 'Resource not found') {
        super(message, HTTP_STATUS.NOT_FOUND);
        this.name = 'NotFoundError';
    }
}

export class BadRequestError extends BaseError {
    constructor(message: string = 'Bad request') {
        super(message, HTTP_STATUS.BAD_REQUEST);
        this.name = 'BadRequestError';
    }
}

export class TooManyRequestError extends BaseError {
    constructor(message: string = 'Too many request, please try again later') {
        super(message, HTTP_STATUS.TOO_MANY_REQUESTS);
        this.name = 'TooManyRequestError';
    }
}

export class ConflictError extends BaseError {
    constructor(message: string = 'Conflict Error') {
        super(message, HTTP_STATUS.CONFLICT);
        this.name = 'ConflictError';
    }
}

export class ValidationError extends BaseError {
    public error: ZodError[];
    constructor(message: string = 'Invalid input', errors: ZodError[]) {
        super(message, HTTP_STATUS.BAD_REQUEST);
        this.name = 'ValidationError';
        this.error = errors;
    }
    getOriginalErrorStack() {
        return this.error;
    }
}

export class UnauthorizedError extends BaseError {
    constructor(message: string = 'Unauthorized') {
        super(message, HTTP_STATUS.UNAUTHORIZED);
        this.name = 'UnauthorizedError';
    }
}

export class UnexpectedError extends BaseError {
    constructor(message: string = 'Unexpected') {
        super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
        this.name = 'UnexpectedError';
    }
}

export class MailError extends BaseError {
    constructor(message: string = 'Error while sending the mail') {
        super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
        this.name = 'MailError';
    }
}

export class PrismaError extends BaseError {
    public error: Error;
    constructor(message: string = 'Database Error: Prisma', error: Error) {
        super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
        this.name = 'PrismaError';
        this.error = error;
    }
    getOriginalErrorStack() {
        return this.error;
    }
}

export class InternalServerError extends BaseError {
    constructor(message: string = 'Internal Server Error', name: string = 'Internal Server Error') {
        super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
        this.name = name;
    }
}

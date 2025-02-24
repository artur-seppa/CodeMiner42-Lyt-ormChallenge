export const ERROR_CODES = {
    RESOURCE_NOT_FOUND: {
        code: 'RESOURCE_NOT_FOUND',
        statusCode: 404
    },
    INVALID_INPUT: {
        code: 'INVALID_INPUT',
        statusCode: 400
    },
    INTERNAL_SERVER_ERROR: {
        code: 'INTERNAL_SERVER_ERROR',
        statusCode: 500
    },
}

export class ApplicationError extends Error {
    constructor(errorCode, message) {
        super(message);
        this.code = errorCode.code;
        this.statusCode = errorCode.statusCode;
    }
}
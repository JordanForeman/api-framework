import Express from 'express';
import handleError from './error-handler';

export default (handler: Express.RequestHandler) => async (
    request: Express.Request,
    response: Express.Response,
    next: Express.NextFunction
) => {
    try {
        return await handler(request, response, next);
    } catch (error) {
        return handleError(error, request, response);
    }
};

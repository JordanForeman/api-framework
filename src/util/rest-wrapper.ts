import Express from 'express';
import handleError from './error-handler';

const SUCCESS = 200;

export default (handler: Express.RequestHandler) => async (
    request: Express.Request,
    response: Express.Response,
    next: Express.NextFunction
) => {
    try {
        const data = await handler(request, response, next);

        response.json(data);
        response.status(SUCCESS);
    } catch (error) {
        handleError(error, request, response);
    }
};

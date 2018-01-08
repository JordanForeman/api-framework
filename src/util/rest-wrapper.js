import handleError from './error-handler';
import { SUCCESS } from '../constant/HTTPStatusCodes';

export default (handler) => async (request, response, next) => {
    try {
        await handler(request, response, next);

        response.status(SUCCESS);
    } catch (error) {
        handleError(error, request, response);
    }
};
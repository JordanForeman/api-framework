import handleError from './error-handler';

const SUCCESS = 200;

export default (handler) => async (request, response, next) => {
    try {
        const data = await handler(request, response, next);

        response.json(data);
        response.status(SUCCESS);
    } catch (error) {
        handleError(error, request, response);
    }
};

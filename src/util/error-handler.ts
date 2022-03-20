import Express from 'express';

const GENERIC_SERVER_ERROR = 500;
const GENERIC_ERROR_MESSAGE = 'An Error Occurred';

export default (
    error: any,
    request: Express.Request,
    response: Express.Response
) => {
    const message = error.message || GENERIC_ERROR_MESSAGE;
    const status = error.statusCode || GENERIC_SERVER_ERROR;

    response.status(status);
    response.json({ message });
    response.end();
};

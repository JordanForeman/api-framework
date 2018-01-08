import { JsonWebTokenError } from 'jsonwebtoken';
import * as dataModel from 'data-modeler';
import {
    NOT_FOUND,
    GENERIC_SERVER_ERROR,
    UNAUTHORIZED,
    SUCCESS,
    UNPROCESSABLE_ENTITY
} from '../constant/HTTPStatusCodes';
import BadDataError from '../errors/BadDataError';
import NotFoundError from '../errors/NotFoundError';

export default (error, request, response) => {
    const { message } = error;

    if (error instanceof dataModel.NotFoundError) {
        response.status(NOT_FOUND);
    } else if (error instanceof dataModel.EmptyCollectionError) {
        response.status(SUCCESS);
    } else if (error instanceof JsonWebTokenError) {
        response.status(UNAUTHORIZED);
    } else if (error instanceof BadDataError) {
        response.status(UNPROCESSABLE_ENTITY);
    } else if (error instanceof NotFoundError) {
        response.status(NOT_FOUND);
    } else {
        response.status(GENERIC_SERVER_ERROR);
    }

    response.json({ message });
    response.end();
};
import Express from 'express';
import { RouteConfig } from '../types';
import restWrapper from './rest-wrapper';

function identity(
    request: Express.Request,
    response: Express.Response,
    next: Express.NextFunction
): void {
    return next();
}

export default (server: Express.Application) => (route: RouteConfig) => {
    const { method, path, config } = route;
    const {
        auth = identity,
        handler,
        middleware = identity
    } = config;

    const wrappedHandler = restWrapper(handler);

    server[method](
        path,
        auth,
        middleware,
        wrappedHandler
    );
};

import getStrategy from '../authentication';
import restWrapper from './rest-wrapper';
import { identity } from '../middleware';

export default (server) => ({ method, path, config }) => {
    const {
        auth,
        handler,
        middleware = identity
    } = config;

    const strategyMiddleware = getStrategy(auth);
    const wrappedHandler = restWrapper(handler);

    server[method.toLowerCase()](
        path,
        strategyMiddleware,
        middleware,
        wrappedHandler
    );
};
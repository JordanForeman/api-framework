import restWrapper from './rest-wrapper';

const identity = (request, response, next) => next();

export default (server) => ({ method, path, config }) => {
    const {
        auth = identity,
        handler,
        middleware = identity
    } = config;

    const wrappedHandler = restWrapper(handler);

    server[method.toLowerCase()](
        path,
        auth,
        middleware,
        wrappedHandler
    );
};

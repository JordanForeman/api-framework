import jwt from './jwt';

const identity = (request, response, next) => next();

const strategies = {
    jwt
};

export default (key) => strategies[key] || identity;
import singleFileMiddleware from './single-file';

export const singleFile = singleFileMiddleware;
export const identity = (req, res, next) => next();

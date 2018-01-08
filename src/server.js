import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';

import logger from './util/logger';
import route from './util/router';

const onStart = (port) => () => {
    logger.info(`application environment: ${process.env.NODE_ENV}`);
    logger.info(`server running on port ${port}`);
};

const onError = (e) => {
    logger.error(`Server Error: ${e.message}`);
};

export default (controllers, config) => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '1024kb' }));
    app.use(morgan('dev'));
    app.use(cors());
    app.use(helmet());

    controllers.forEach(route(app));

    const server = http.createServer(app);

    server.on('listening', onStart(config.port));
    server.on('error', onError);

    server.listen(config.port);
};

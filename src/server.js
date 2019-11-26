import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';

import route from './util/router';

const DEFAULT_CONFIG = {
    port: 8080,
    onStart: () => null,
    onError: () => null
};

export function start(controllers, config) {
    const mergedConfig = {
        ...DEFAULT_CONFIG,
        ...config
    };
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '1024kb' }));
    app.use(morgan('dev'));
    app.use(cors());
    app.use(helmet());

    controllers.forEach(route(app));

    const server = http.createServer(app);

    server.on('listening', mergedConfig.onStart);
    server.on('error', mergedConfig.onError);

    server.listen(mergedConfig.port);
}

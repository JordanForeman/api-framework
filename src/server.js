import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';

import route from './util/router';

const DEFAULT_CONFIG = {
    port: 8080,
    plugins: [],
    onStart: () => null,
    onError: () => null
};

let _server, // eslint-disable-line no-underscore-dangle
    _config; // eslint-disable-line no-underscore-dangle

export function setup(controllers, config) {
    _config = {
        ...DEFAULT_CONFIG,
        ...config
    };
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '1024kb' }));
    app.use(morgan('dev'));
    app.use(cors());
    app.use(helmet());

    _config.plugins.forEach((plugin) => {
        app.use(plugin);
    });

    controllers.forEach(route(app));

    _server = http.createServer(app);

    _server.on('listening', _config.onStart);
    _server.on('error', _config.onError);
}

export function start() {
    _server.listen(_config.port);
}

import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';

import route from './util/router';
import { ConfigObject, RouteConfig } from './types';

/* Helmet must be required due to a bug with its TypeScript definitions */
const helmet = require('helmet');


const DEFAULT_PORT = 8080;

let _server: http.Server, // eslint-disable-line no-underscore-dangle
    _config: ConfigObject; // eslint-disable-line no-underscore-dangle

export function setup(controllers: Array<RouteConfig>, config: ConfigObject) {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '1024kb' }));
    app.use(morgan('dev'));
    app.use(cors());
    app.use(helmet());

    if (config.plugins) {
        config.plugins.forEach((plugin) => {
            app.use(plugin);
        });
    }

    controllers.forEach(route(app));

    _server = http.createServer(app);
    _config = config;

    if (config.onStart) _server.on('listening', config.onStart);
    if (config.onError) _server.on('error', config.onError);
}

export function start() {
    _server.listen(_config.port || DEFAULT_PORT);
}

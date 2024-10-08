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

export function setup(controllers: Array<RouteConfig>, config: ConfigObject): express.Application {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '1024kb' }));

    if (config.useMorgan) {
        app.use(morgan(config.logFormat || 'dev'));
    }
    app.use(cors());
    app.use(helmet());

    controllers.forEach(route(app));
    
    if (config.plugins) {
        config.plugins.forEach((plugin) => {
            app.use(plugin);
        });
    }

    _server = http.createServer(app);
    _config = config;

    if (config.onStart) _server.on('listening', config.onStart);
    if (config.onError) _server.on('error', config.onError);

    return app;
}

export function start(): http.Server {
    _server.listen(_config.port || DEFAULT_PORT);
    return _server;
}

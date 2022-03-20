import Express from 'express';

export interface RouteHandlerConfig {
    auth?: Express.RequestHandler,
    handler: Express.RequestHandler,
    middleware?: Express.RequestHandler
}

export enum HTTPMethod {
    get = 'get',
    post = 'post',
    put = 'put',
    delete = 'delete'
}

export interface RouteConfig {
    method: HTTPMethod,
    path: string,
    config: RouteHandlerConfig
}

export interface ConfigObject {
    onStart?: () => void,
    onError?: (err: Error) => void,
    port: number,
    plugins?: Array<any>
}

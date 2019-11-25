# `@jordanforeman/api-framework`

Everything you need to start creating a NodeJS based API Server. Handles common tasks such as:

* Authentication
* Error handling
* Server configuration

## Installation

```bash
$ npm i --save @jordanforeman/api-framework
```

## Usage

```js
import { start } from '@jordanforeman/api-framework';
import controllers from './controllers';

const config = {
    port: 8080
};

start(controllers, config);
```

## Controller Syntax

This module is an opinionated wrapper around the Express framework, however controller syntax is heavily inspired by HapiJS. The `controllers` parameter passed to the `start` method is an array of objects with the following structure:

Property | Description
------------- | -------------
path | The API route/path
method | the standard HTTP method to use (maps to [Express router methods](https://expressjs.com/en/4x/api.html#router.METHOD))
config.handler | A single Express method callback with signature `(request, response, next)`
config.middleware | (optional) the middleware (or middlewares) to use for this controller
config.auth | (optional) the authentication strategy to use for this controller

```js
import { strategies } from '@jordanforeman/api-framework';
import { auth as jwtAuth } from '@jordanforeman/jwt-authentication';

export const myController = {
    path: '/',
    method: 'GET',
    config: {
        auth: jwtAuth,
        handler: getRoot
    }
};
```

## Authentication Strategies

Authentication strategies are published separately from this module. The following strategies are implemented to work with this module:

* [`@jordanforeman/jwt-authentication`](https://github.com/jordanforeman/authentication-strategies/tree/master/packages/jwt-authentication)

## Helpful Links

* [Express Request](https://expressjs.com/en/4x/api.html#req)
* [Express Response](https://expressjs.com/en/4x/api.html#res)
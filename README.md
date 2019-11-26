# `@jordanforeman/api-framework`

Everything you need to start creating NodeJS based API Servers.

<span class="badge-npmversion"><a href="https://www.npmjs.com/package/@jordanforeman/api-framework" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@jordanforeman/api-framework.svg" alt="NPM version" /></a></span>
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![](https://github.com/JordanForeman/api-framework/workflows/Semantic%20Release/badge.svg)
![](https://github.com/JordanForeman/api-framework/workflows/PR%20Verify/badge.svg)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)

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

## Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `port` | The port to run the server on | `8080` |
| `onStart` | (optional) a function to run when the server starts | **n/a** |
| `onError` | (optional) a function to run when the server encounters an error (takes a single parameter, which is the error) | **n/a** |

## Controller Syntax

This module is an opinionated wrapper around the Express framework, however controller syntax is heavily inspired by HapiJS. The `controllers` parameter passed to the `start` method is an array of objects with the following structure:

Property | Description
------------- | -------------
path | The API route/path
method | the standard HTTP method to use (maps to [Express router methods](https://expressjs.com/en/4x/api.html#router.METHOD))
config.handler | A single Express method callback with signature `(request, response, next)`
config.middleware | (optional) the [middleware](https://expressjs.com/en/guide/using-middleware.html) (or middlewares) to use for this controller
config.auth | (optional) the authentication strategy to use for this controller (see below)

```js
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
* [Express Middleware](https://expressjs.com/en/guide/using-middleware.html)
* [Authentication Strategies](https://github.com/jordanforeman/authentication-strategies)

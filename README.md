# api-framework

Everything you need to start creating a NodeJS based API Server. Handles common tasks such as:

* Authentication
* Error handling
* Server configuration

## Installation

```bash
$ npm i --save api-framework
```

## Usage

```js
import { start } from 'api-framework';
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
config.middleware | `TODO` document this
config.handler | A single Express method callback with signature `(request, response, next)`
config.auth | (optional) the key of the authentication strategy to use for this controller

```js
import { strategies } from 'api-framework';

export const myController = {
    path: '/',
    method: 'GET',
    config: {
        auth: strategies.JWT,
        handler: getRoot
    }
};
```

### Authentication Strategies

Authentication strategies are predefined Express middleware that handle authentication requirements for a given API route controller. Simply add: `auth: <strategy>` to your controller's `config`, and `api-framework` will handle the rest.

### Available Strategies

Name | Description
------------- | -------------
JWT | Reads 'x-access-token' from the request headers and verifies against the app secret defined in `config`. Immediately returns a 403 if token is invalid

### Default Middleware

`TODO:` document this

## Helpful Links

* [Express Request](https://expressjs.com/en/4x/api.html#req)
* [Express Response](https://expressjs.com/en/4x/api.html#res)
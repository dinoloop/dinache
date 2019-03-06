[![npm version](https://img.shields.io/npm/v/dinache.svg)](https://www.npmjs.com/package/dinache)
[![downloads](https://img.shields.io/npm/dm/dinache.svg)](https://www.npmjs.com/package/dinache)
[![Known Vulnerabilities](https://snyk.io/test/github/dinoloop/dinache/badge.svg)](https://snyk.io/test/github/dinoloop/dinache)

# Dinache
Dinache is an open source RESTFUL light weight in-memory cache server built on top of node.js and [dinoloop.](https://github.com/ParallelTask/dinoloop)

## Why Dinache?
You can quickly setup a cache server via HTTP endpoint by installing a npm package.
HTTP and JSON format are supported across variety of programming languages.
Nodejs is known for handling millions of concurrent requests with less memory
and Javascript objects are key-value pairs which makes Nodejs a perfect choice to build light weight
in-memory cache server.

## Prerequisites
* Node 8.10.x or higher

## Install
```
npm install dinache
```

## Quickstart

#### Step 1: Add app.ts (file: app.ts)
```
import { Dinache } from 'dinache';

// Checks for process.env.PORT and if not found, starts in-memory cache server on default 8080 port.
new Dinache().start();

// Checks for process.env.PORT and if not found, starts in-memory cache server on provided 4200 port.
new Dinache(4200).start();
```
#### Step 2: Open your Postman (make a POST request to http://localhost:8080/query")
* GET key
```
// GET key
{
    query: {
        op: 'GET',
        key: 'key1'
    }
}
// result
{
    query: {
        value: 'YOU_WILL_GET_VALUE'
    }
}
```
* PUT key
```
// PUT key
{
    query: {
        op: 'PUT',
        key: 'key1',
        value: 'value1'
    }
}
// result
{
    query: { }
}
// or you receive the following error when you try to put a key which already exists.
{
    query: {
        error: 'KEY_EXISTS'
    }
}
```
* DELETE key
```
// DELETE key
{
    query: {
        op: 'DELETE',
        key: 'key1'
    }
}
// result is similar when you try to delete a key that exists or not.
{
    query: { }
}
```
* UPSERT key
```
// UPSERT key
{
    query: {
        op: 'UPSERT',
        key: 'key1',
        value: 'value1'
    }
}
// result is similar when you try to upsert a key that exists or not.
{
    query: { }
}
```
* UPDATE key
```
// UPDATE key
{
    query: {
        op: 'UPDATE',
        key: 'key1',
        value: 'value1'
    }
}
// result
{
    query: { }
}
// or you receive the following error when you try to update a key which dont exists.
{
    query: {
        error: 'KEY_NOT_EXISTS'
    }
}
```
* Possible values for op are GET | PUT | UPDATE | UPSERT | DELETE.
* Use UPSERT if you want to update or create.
* Use PUT if you want to create when key not exists.

#### Batch queries (make a POST request to http://localhost:8080/query")
You can also execute batch queries instead of making subsequent calls to server and reduce round-trips.
```
// batch-queries
{
    batch: [{
        op: 'GET',
        key: 'key1'
    }, {
        op: 'PUT'
        key: 'key2',
        value: 'value2
    }, {
        op: 'PUT'
        key: 'key2',
        value: 'value2
    }]
}
// result
{
    batch: [{
        value: 'value1'
    }, {

    },{
        error: 'KEY_EXISTS'
    }]
}
```
## License
MIT Licensed.

## Contact
Please direct the issues and feature requests to [Github](https://github.com/dinoloop/dinache/issues). Send your queries/questions on [Gitter](https://gitter.im/dinache-lobby/community).

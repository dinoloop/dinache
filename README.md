[![npm version](https://img.shields.io/npm/v/dinache.svg)](https://www.npmjs.com/package/dinache)

# Dinache

Dinache is a restful light weight in-memory cache server built on top of node.js and dinoloop.

## Install
```
npm install dinache
```

## Quickstart

#### Step 1: Add (file: app.ts)
```
import { Dinache } from 'dinache';

// Checks for this.env.PORT and if not configured, starts in-memory cache server on default 8080 port.
new Dinache().start();

// Checks for this.env.PORT and if not configured, starts in-memory cache server on provided 4200 port.
new Dinache(4200).start();
```
#### Step 2: Open your Postman (make a POST request to http://localhost:8080/query")
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
        value: 'KEYS_VALUE'
    }
}

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
    query: {}
}
// or you receive the following error when you try to put a key which already exists.
{
    query: {
        error: 'KEY_EXISTS'
    }
}

Possible values for op are GET | PUT | UPSERT | DELETE.
Use UPSERT if you want to update or create.
Use PUT if you want to create when key not exists.
```
#### Step 3: Batch queries (make a POST request to http://localhost:8080/query")
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

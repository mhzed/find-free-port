find-free-port
--------

Find free TCP port or ports to listen locally on.

## Installation

```bash
npm install find-free-port --save-dev
```

## Examples

### Single Free Port Search

Find the first free port to listen on beginning from port `3000`.

```js
var fp = require("find-free-port");

fp(3000, function(err, freePort) {
    // do something with port...
});
```
    
Find the first free port to listen on between ports `3000` and `3100` (not including port `3100`).

```js
var fp = require("find-free-port");

fp(3000, 3100, function(err, freePort){
    // do something with port...
});
```
    
Find the first free port to listen on between ports `3000` & `3100` and that are bound only to the ip `127.0.0.1`.

```js
var fp = require("find-free-port");

fp(3000, 3100, "127.0.0.1", function(err, freePort){
    // do something with port...
});
```

Find the first free port to listen on beginning from port `3000` and bound only to the ip `127.0.0.1`.

```js
var fp = require("find-free-port");

fp(3000, "127.0.0.1", function(err, freePort){
    // do something with port...
});
```

### Multiple Free Port Search

Find `n` amount of free ports to listen on. In this case, find the first `3` free ports between ports `3000` & `3100` and that are bound only to the ip `127.0.0.1`.

```js
var fp = require("find-free-port");

fp(3000, 3100, "127.0.0.1", 3, function(err, p1, p2, p3){
    // do something with ports...
});
```

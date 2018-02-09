find-free-port
--------

Find free tcp port or ports to listen locally.  The definition of 'free' port is that calling nodejs api [server.listen(port, ip)](https://nodejs.org/api/net.html#net_server_listen) results in a 'listening' event instead of 'error' event'.

This implies that it's legal to listen on both '0.0.0.0:12345' and '127.0.0.1:12345', and thus allowed by find-free-port.

## Installation
```bash
npm install find-free-port --save
```

## Examples

Find a free port to listen on that is >= 3000
```js
var fp = require("find-free-port")
    fp(3000, function(err, freePort){
});
```
    
Find a free port to listen on that is >= 3000 and < 3100
```js
var fp = require("find-free-port")
    fp(3000, 3100, function(err, freePort){
});
```
    
Find a free port to listen on that is >= 3000 and < 3100 and bound to ip 127.0.0.1
```js
var fp = require("find-free-port")
    fp(3000, 3100, '127.0.0.1', function(err, freePort){
});
```
    
Find a free port to listen on that is >= 3000 and bound to ip 127.0.0.1
```js
var fp = require('find-free-port')
    fp(3000, '127.0.0.1', function(err, freePort){
});
```
    
Find 3 free ports to listen on that is >= 3000 and bound to ip 127.0.0.1
```js
var fp = require("find-free-port")
    fp(3000, 3100, '127.0.0.1', 3, function(err, p1, p2, p3){
});
```

## Promise

If the callback is omitted, then the call returns a Promise that resolve to a list of avaiable ports:
```js
var fp = require("find-free-port")
fp(3000).then(([freep]) => {
    console.log('found ' + freep);
}).catch((err)=>{
    console.error(err);
});
```

find-free-port
--------

Find free tcp port or pors to listen on.  The definition of 'free' port is that connecting to this port and host ('localhost' by default) will not succeed, and thus 'free'.

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
            
Find 3 free ports to listen on that is >= 3000 locally
```js
var fp = require("find-free-port")
fp(3000, 3100, '127.0.0.1', 3, function(err, p1, p2, p3){
});
```

Find a free port that is >= 3000 and at host 192.168.100.1
```js
var fp = require("find-free-port")
fp(3000, "192.168.100.1", function(err, freePort){
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

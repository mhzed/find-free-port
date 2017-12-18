find-free-port
--------

Find free tcp port or ports to listen locally.

## Installation

    npm install find-free-port

## Examples

Find a free port to listen on that is >= 3000

    var fp = require("find-free-port")
    fp(3000, function(err, freePort){
    });
    
Find a free port to listen on that is >= 3000 and < 3100

    var fp = require("find-free-port")
    fp(3000, 3100, function(err, freePort){
    });
    
Find a free port to listen on that is >= 3000 and < 3100 and bound to ip 127.0.0.1

    var fp = require("find-free-port")
    fp(3000, 3100, '127.0.0.1', function(err, freePort){
    });
    
Find a free port to listen on that is >= 3000 and bound to ip 127.0.0.1

    var fp = require("find-free-port")
    fp(3000, '127.0.0.1', function(err, freePort){
    });
    
Find 3 free ports to listen on that is >= 3000 and bound to ip 127.0.0.1

    var fp = require("find-free-port")
    fp(3000, 3100, '127.0.0.1', 3, function(err, p1, p2, p3){
    });

## Promise

If the callback is omitted, then the call returns a Promise that resolve to a list of avaiable ports:

    var fp = require("find-free-port")
    fp(3000).then(([freep])=>{
        console.log("found ' + freep);
    }).catch((err)=>{
        console.error(err);
    });

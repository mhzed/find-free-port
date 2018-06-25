
const fp = require("./index");
const assert = require("assert");
const net = require("net");

const port_base = 61342;
let port_listen = 0;
let server;
describe('find-free-port', function() {
  it('find and listen on port', function() {
    return fp(port_base).then(([p])=>{
      port_listen = p;
      server = net.createServer().listen(p);
      return new Promise((resolve, reject)=> {
        server.on('listening', resolve);
        server.on('error', reject);
      })
    })
  })
  it('find port with conflict', function() {
    return fp(port_listen).then(([p])=>{
      assert(p > port_listen);
    })
  }) 
  it('find no port with end', function() {
    return fp(port_listen, port_listen+1).then(()=>{
      assert(false, 'should not suceed');
    }).catch((err)=>{
      assert(true);
    })
  })
  it('find many ports', function() {
    return fp(port_listen, port_listen+10, null, 2).then(([p1, p2])=> {
      assert(p1 > port_listen);
      assert(p2 > port_listen);
    });
  })

  it('finish listen', function() {
    return new Promise((resolve, reject)=> {server.close(resolve);});
  });

  it('find listen port with localhost', function(){
    return fp(port_base, '127.0.0.1').then(([p])=>{
      port_listen = p;
      server = net.createServer().listen(p, '127.0.0.1');
      return new Promise((resolve, reject)=> {
        server.on('listening', resolve);
        server.on('error', reject);
      })
    })    
  })
  it('find single port', function() {
    fp(port_listen, '127.0.0.1').then(([p])=>{
      assert(p > port_listen);
    })
  })
  it('finish listen', function() {
    return new Promise((resolve, reject)=> { server.on('error', reject); server.close(resolve);});
  });
  
})

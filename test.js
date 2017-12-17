
const fp = require("./index");
const assert = require("assert");
const net = require("net");

const port_base = 61342;

// test 1: able to find a free port
fp(port_base, function(err, port){
  assert((err === null));
  // test 2: able to skip used port and find next free port
  const s = net.createServer().listen(port_base);
  return s.on('listening', ()=>
    fp(port_base, function(err, port){
      assert((err === null));
      assert(port > port_base);
      // test 3: end works
      return fp(port_base, port_base+1, function(err, port){
        assert((err !== null));

        // test 4: find many ports
        return fp(port_base, port_base+10, '0.0.0.0', 2, function(err, port1, port2){
          assert((err === null));
          assert(port1> port_base);
          assert(port2> port_base);
          s.close();

          fp(port_base).then(([freep])=>{
            assert(freep == port_base);
          }).catch ((err)=>{
            assert(false);
          })
        });
      });
    })
  );
});



fp = require "./index"
assert = require "assert"
net = require "net"

port_base = 3300

# test 1: able to find a free port
fp port_base, (err, port)->
  assert (err == null)
  # test 2: able to skip used port and find next free port
  s = net.createServer().listen(port_base)
  s.on 'listening', ()->
    fp port_base, (err, port)->
      assert (err == null)
      assert port > port_base
      # test 3: end works
      fp port_base, port_base+1, (err, port)->
        assert (err != null)

        # test 4: find many ports
        fp port_base, port_base+10, '0.0.0.0', 2, (err, port1, port2)->
          assert (err == null)
          assert port1> port_base
          assert port2> port_base

          s.close()


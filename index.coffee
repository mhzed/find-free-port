net = require "net"

# call method 1: (port, cb(err, freePort))
# call method 2: (portBeg, portEnd, cb(err, freePort))
# call method 3: (portBeg, host, cb(err, freePort))
# call method 4: (portBeg, portEnd, host, cb(err, freePort))
# call method 5: (portBeg, portEnd, host, howmany, cb(err, freePort1, freePort2, ...))

module.exports = (beg, p..., cb)->
  [end, ip, cnt] = p
  if not ip and end and not /^\d+$/.test(end) # deal with method 3
    ip = end
    end = 65534
  else
    end ?= 65534
    ip ?= '0.0.0.0'
  cnt ?= 1

  retcb = cb
  res = []
  prob = (ip, port, cb)->
    s = net.createServer().listen port, ip
    s.on 'listening', ()-> s.close(); cb(port);
    s.on 'error', (err)-> cb(null, port + 1);
  onprob = (port, nextPort)->
    if port
      res.push port
      if res.length >= cnt
        retcb.apply(null, [null].concat(res))
      else
        setImmediate ()->prob ip, port+1, onprob
    else
      if nextPort>=end
        retcb(new Error("No available ports"))
      else
        setImmediate ()->prob ip, nextPort, onprob
  prob ip, beg, onprob

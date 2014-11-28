net = require "net"

# call method 1: (port, cb(err, freePort))
# call method 2: (portBeg, portEnd, cb(err, freePort))
# call method 3: (portBeg, host, cb(err, freePort))
# call method 4: (portBeg, portEnd, host, cb(err, freePort))

module.exports = (beg, p..., cb)->
  [end, ip] = p
  if not ip and end and not /^\d+$/.test(end) # deal with method 3
    ip = end
    end = 65534
  else
    end ?= 65534
    ip ?= '0.0.0.0'

  prob = (ip, port, cb)->
    s = net.createServer().listen port, ip
    s.on 'listening', ()-> s.close(); cb(port);
    s.on 'error', (err)-> cb(null, port + 1);
  onprob = (port, nextPort)->
    if port then cb(null, port)
    else
      if nextPort>=end then cb("No available ports")
      else setImmediate ()->prob ip, nextPort, onprob
  prob ip, beg, onprob

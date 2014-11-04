net = require "net"

module.exports = (beg, p..., cb)->
  [end, ip] = p
  end ||= 65534
  ip ||= '0.0.0.0'

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

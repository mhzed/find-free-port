const net = require("net");

// call method 1: (port, cb(err, freePort))
// call method 2: (portBeg, portEnd, cb(err, freePort))
// call method 3: (portBeg, host, cb(err, freePort))
// call method 4: (portBeg, portEnd, host, cb(err, freePort))
// call method 5: (portBeg, portEnd, host, howmany, cb(err, freePort1, freePort2, ...))

module.exports = function(beg, ...rest){
  const p = rest.slice(0, rest.length - 1), cb = rest[rest.length - 1];
  let [end, ip, cnt] = Array.from(p);
  if (!ip && end && !/^\d+$/.test(end)) { // deal with method 3
    ip = end;
    end = 65534;
  } else {
    if (end == null) { end = 65534; }
    if (ip == null) { ip = '0.0.0.0'; }
  }
  if (cnt == null) { cnt = 1; }

  const retcb = cb;
  const res = [];
  const prob = function(ip, port, cb){
    const s = net.createServer().listen(port, ip);
    s.on('listening', function(){ s.close(); return cb(port); });
    return s.on('error', err=> cb(null, port + 1));
  };
  var onprob = function(port, nextPort){
    if (port) {
      res.push(port);
      if (res.length >= cnt) {
        return retcb.apply(null, [null].concat(res));
      } else {
        return setImmediate(()=> prob(ip, port+1, onprob));
      }
    } else {
      if (nextPort>=end) {
        return retcb(new Error("No available ports"));
      } else {
        return setImmediate(()=> prob(ip, nextPort, onprob));
      }
    }
  };
  return prob(ip, beg, onprob);
};

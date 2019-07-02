const cache = require("memory-cache");
let memCache = new cache.Cache();
module.exports = {
  cacheMiddleware: duration => {
    return (req, res, next) => {
      let key = req.url;
      let cacheContent = memCache.get(key);
      if (cacheContent) {
        res.send(cacheContent);
        return;
      } else {
        res.sendResponse = res.send;
        res.send = body => {
          memCache.put(key, body, duration * 1000);
          res.sendResponse(body);
        };
        next();
      }
    };
  }
};

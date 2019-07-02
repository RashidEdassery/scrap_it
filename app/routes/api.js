const request = require("request");
const cheerio = require("cheerio");
const middlewares = require("../middlewares/middlewares");

module.exports = function(router) {
  // Caching the request/response data for 5 minutes
  router.get("/scrap", middlewares.cacheMiddleware(300), function( req, res ) {
    let requestOptions = {
      rejectUnauthorized: false, //To proceed even if there is an issue with SSL cert:
      url: req.query.url,
      method: "GET"
    };

    request(requestOptions, function(error, response, responseHtml) {
      var resObj = {};

      if (error) {
        res.json({ success: false, message: "Invalid url provided. Need full URL, starting with http." });
        return;
      }

      let $ = cheerio.load(responseHtml);
      let title = $("head title").text();
      let description = $('meta[name="description"]').attr("content");
      let keywords = $('meta[name="keywords"]').attr("content");
      let ogTitle = $('meta[property="og:title"]').attr("content");
      let ogkeywords = $('meta[property="og:keywords"]').attr("content");
      let ogImage = $('meta[property="og:image"]').attr("content");
      let images = $("img");

      title && (resObj.title = title);
      description && (resObj.description = description);
      keywords && (resObj.keywords = keywords);

      if (ogImage && ogImage.length) {
        resObj.ogImage = ogImage;
      }

      if (ogTitle && ogTitle.length) {
        resObj.ogTitle = ogTitle;
      }

      if (ogkeywords && ogkeywords.length) {
        resObj.ogkeywords = ogkeywords;
      }

      if (images && images.length) {
        resObj.images = [];
        for (var i = 0; i < images.length; i++) {
          resObj.images.push($(images[i]).attr("src"));
        }
      }

      res.json({ success: true, data: resObj });
    });
  });

  return router;
};

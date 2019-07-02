# Readme

A Node.JS app (Express) to scrap website metadata like title, description, OG params etc... Used Cheerio and request libraries to fetch and scrap websites.

The requests are cached for 5 minutes to improve the performance.

**Example**

`GET http://localhost:3000/api/scrap?url=https://medium.com`

Above request returns response similar to the following:

```json
{
  "success": true,
  "data": {
    "title": "Medium – a place to read and write big ideas and important stories",
    "description": "Welcome to Medium, a place where words matter. Medium taps into the brains of the world’s most insightful writers, thinkers, and storytellers to bring you the smartest takes on topics that matter. So whatever your interest, you can always find fresh thinking and unique perspectives.",
    "ogImage": "https://cdn-images-1.medium.com/max/1200/1*L0zf9ap8xoInVbm78siJBA.png",
    "ogTitle": "Medium – a place to read and write big ideas and important stories"
  }
}
```
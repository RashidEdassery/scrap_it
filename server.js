const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const router = express.Router();
const appRoutes = require("./app/routes/api")(router);

app.use(morgan("dev"));
// app.use(function (req, res, next) {
//   var allowedOrigins = ['http://localhost:9999']
//   var origin = req.headers.origin
//   console.log(origin)
//   if (allowedOrigins.indexOf(origin) > -1) {
//     res.header('Access-Control-Allow-Origin', origin)
//   }
//   res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, HEAD')
//   res.header('Access-Control-Allow-Credentials', 'true')
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, x-access-token, Content-Type, Accept-Ranges'
//   )
//   next()
// })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", appRoutes);

app.get("*", function(req, res) {
  res.send("Welcome, from backend!!");
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

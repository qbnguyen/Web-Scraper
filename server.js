var express = require("express");
// var mongojs = require("mongojs");
var mongoose = require("mongoose");

var cheerio = require("cheerio");
var axios = require("axios");
var articles = require("./models/articles.js");
var routes = require("./controller/article_controller.js");

var app = express();
app.use(express.static("public"));
mongoose.Promise = Promise;
app.use (express.urlencoded({extended:true}));
// var databaseUrl = "mongodb://127.0.0.1:27017/scraper";
// var collections = ["scrapedData"];

// var db = mongojs(databaseUrl, collections);
var mongoConfig = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/scraper";
mongoose.connect(mongoConfig);
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Database Error:", error);
});
db.once("open", function(){
  console.log("connected to mongoose");
});

app.use("/", routes);



var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("App running on port 3000!");
});
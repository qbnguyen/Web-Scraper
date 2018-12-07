var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");

var Articles = require("../models/articles.js");

var router = express.Router()


router.get("/scrape", function(req, res){


    axios.get("https://www.nhl.com/").then(function(response) {
    
      // Load the body of the HTML into cheerio
      var $ = cheerio.load(response.data);
      
      
      // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
      $("h4.headline-link").each(function(i, element) {
    
        // Save the text of the h4-tag as "title"
        var title = $(element).text();
    
        // Find the h4 tag's parent a-tag, and save it's href value as "link"
        var link = $(element).parent().attr("href");
    
        // Make an object with data we scraped for this h4 and push it to the results array
        if(title && link){
    
        db.scrapedData.insert({
          title: title,
          link: link
        },
        function(err, inserted){
          if (err){
            console.log(err);
          }
          else{
            console.log(inserted);
          }
        });
      }
      });
    });
      // After looping through each h4.headline-link, log the results
      console.log(results);
      // res.send("Scrape Complete");
    res.redirect("/articles");
    });

    router.get("/articles", function(req, res){
        Articles.find(function(err, data){
            if(err){
                console.log(err);
            }else{
                res.json(data);
            }
        });
    });

    module.exports = router;
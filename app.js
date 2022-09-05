const express= require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app= express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const location = req.body.location;
  const appKey="311e3349d646cbd4dd6528b1fb5fc745";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+appKey+"&units="+unit;
  https.get(url,function(response){
    response.on("data",function(data){
      const weatherReport =JSON.parse(data);
      const temp= weatherReport.main.temp;
      const desc = weatherReport.weather[0].description;
      const icon = weatherReport.weather[0].icon;
      const imgurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p>The weather description is:"+ desc+"</p> ");
      res.write("<h1>The temp in "+location +"is: "+ temp +"degree celsius.</h1>");
      res.write("<img src="+imgurl+">")
      res.send();
    });
  });
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});

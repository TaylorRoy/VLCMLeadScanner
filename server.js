const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const session = require('express-session');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
// }
app.use(express.static("client/build"));
// app.use(express.static(__dirname + './client/build'))
// Add routes, both API and view
app.use(session({
	secret: process.env.secret || "skebopboo",
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: (1000*60*60*24*14) }
}))
app.use(routes);

app.get('/*', function(req, res){
  let url = req.originalUrl
  if(url.includes('%23')){
    url = url.split('%23')[1]
  }
  let redirect = req.protocol + "://" + req.get("host") + "#" + url
  let html ='<!DOCTYPE html><html><head><meta charset="utf-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>Page Title</title><meta name="viewport" content="width=device-width, initial-scale=1"></head><div>Redirecting...<script>window.location.href="'+redirect+'";</script></body></html>'
  res.send(html)
})


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/vlcmDatabase");

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});


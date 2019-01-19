const mongoose = require("mongoose");
const db = require("../models");
const leadSeed = require ("./leads")


// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/vlcmDatabase"
);


db.Scan
  .remove({})
  .then(() => db.Scan.collection.insertMany(leadSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
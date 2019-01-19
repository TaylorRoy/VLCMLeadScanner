const mongoose = require("mongoose");
const db = require("../models");
const vendorSeed = require ("./vendors")


// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/vlcmDatabase"
);


db.Vendor
  .remove({})
  .then(() => db.Vendor.collection.insertMany(vendorSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
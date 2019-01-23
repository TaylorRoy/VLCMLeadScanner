const mongoose = require("mongoose");
const db = require("../models");
const attendeeSeed = require ("./attendee")


// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/vlcmDatabase"
);


db.Attendee
  .remove({})
  .then(() => db.Attendee.collection.insertMany(attendeeSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
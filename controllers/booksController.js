const db = require("../models");
var fs = require("fs");

// Defining methods for the booksController
module.exports = {
  readFile: function (req, res) {
    console.log("in readFile")
    fs.readFile("results.txt", "utf8", function (error, data) {

      // If the code experiences any errors it will log the error to the console.
      if (error) {
        return console.log("your got an error", error);
      }
      console.log("results.txt", data);
    })
  },
  findAll: function(req, res) {
    db.Scan
      .find(req.query)
      // .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Scan
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
		console.log(req.body)
    // console.log("in create", req);
    db.Scan.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => { 
				console.log(err)
				res.status(422).json(err)
			});
  },
  update: function(req, res) {
    db.Scan
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Scan
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

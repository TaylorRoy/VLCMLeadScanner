const db = require("../models");


// Defining methods for the booksController
module.exports = {

  
  create: function(req, res) {
		console.log(req.body)
    // console.log("in create", req);
    db.Attendee.create(req.body)
      .then(() => res.json(req.body))
      .catch(err => { 
				console.log(err)
				res.status(422).json(err)
			});
  }
 
};

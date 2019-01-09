const db = require("../models");
var fs = require("fs")

module.exports = {

login: function(req,res){
	db.Vendor
	.findOne({username: req.body.username, password: req.body.password}, function(err,data){
		if (err) {
			return res.sendStatus(500)
		}
		if (data){

			

			res.json(data)

		}
	})
	
	
}
}

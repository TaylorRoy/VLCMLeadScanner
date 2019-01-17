const db = require("../models");


module.exports = {

login: function(req,res){

	
	db.Vendor
	.findOne({username: req.body.username, password: req.body.password}, function(err,data){
		if (err) {
			return res.sendStatus(500)
		}
		if (data){
			 req.session.user = data
			 req.session.auth = true

			console.log(req.session)

			res.json(req.session)

		}
	})
	
	
}
}

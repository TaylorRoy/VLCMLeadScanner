const db = require("../models");


module.exports = {

	login: function (req, res) {



		db.Vendor
			.findOne({ Username: req.body.username, Password: req.body.password }, function (err, data) {
				if (err) {
					return res.sendStatus(500)
				}
				if (data && data.Username === "Admin") {
					req.session.user = data
					req.session.auth = true
					req.session.admin = true

					console.log(req.session)

					res.json(req.session)
				}
				else if (data) {
					req.session.user = data
					req.session.auth = true
					req.session.admin = false

					console.log(req.session)
					console.log(data)

					res.json(req.session)

				}

			
			})


	},

	verifyLogin: function (req, res) {
		if (req.session) {
			if (req.session.auth && req.session.admin) {
				return res.status(200).send({
					auth: true,
					admin: true, username: req.session.user
				})
			}
			else if (req.session.auth){
				return res.status(200).send({
					auth: true,
					admin: false, 
					username: req.session.user
				})
			}
			else {
				return res.status(200).send({ 
					message: "Try Signing In.", 
					auth: false });
			}
		} else {
			return res.status(200).send({ message: "Try Signing In.", authenticated: false });
		}
	},


	logOut: function (req, res) {
		if (req.session) {
			if (req.session.auth && req.session.admin) {
				req.session.user = ""
				req.session.auth = false
				req.session.admin = false
				return res.status(200).send({
					auth: false,
					admin: false, username: ""
				})
			}
			else if (req.session.auth){
				req.session.user = null
				req.session.auth = false
				return res.status(200).send({
					auth: false,
					admin: false, 
					username: ""
				})
			}
			else {
				return res.status(200).send({ 
					message: "Try Signing in before Signing Out.", 
					auth: false });
			}
		} else {
			return res.status(200).send({ message: "Try Signing In before Signing OUt.", authenticated: false });
		}
	}

}






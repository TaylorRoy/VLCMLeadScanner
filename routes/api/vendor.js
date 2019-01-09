const router = require ("express").Router();
//get Controller later

router.route("/login")
.post(vendorController.login)
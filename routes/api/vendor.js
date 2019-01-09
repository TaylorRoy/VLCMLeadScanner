const router = require ("express").Router();
//get Controller later

const vendorController = require("../../controllers/vendorController")

router.route("/login")
.post(vendorController.login)


module.exports = router;
const router = require ("express").Router();
//get Controller later

const vendorController = require("../../controllers/vendorController")

router.route("/login")
.post(vendorController.login)
.get(vendorController.verifyLogin);

router.route("/logout")
.get(vendorController.logOut);

module.exports = router;
const router = require("express").Router();
const attendeeController = require("../../controllers/attendeeController");

// Matches with "/api/leads"
router.route("/add")
  .post(attendeeController.create);

// Matches with "/api/leads/:id"


module.exports = router;
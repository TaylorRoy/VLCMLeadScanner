const router = require("express").Router();
const leadsRoutes = require("./leads");
const vendorRoutes = require("./vendor")
const attendeeRoutes = require("./attendee")

//Lead routes
router.use("/leads", leadsRoutes);
router.use("/vendor",vendorRoutes);
router.use("/attendee",attendeeRoutes)

module.exports = router;
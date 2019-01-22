const router = require("express").Router();
const leadsRoutes = require("./leads");
const vendorRoutes = require("./vendor")

//Lead routes
router.use("/leads", leadsRoutes);
router.use("/vendor",vendorRoutes)

module.exports = router;
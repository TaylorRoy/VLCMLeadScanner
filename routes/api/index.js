const router = require("express").Router();
const bookRoutes = require("./books");
const vendorRoute = require("./vendor")

// Book routes
router.use("/books", bookRoutes);
router.use("/vendor", vendorRoute);

module.exports = router;
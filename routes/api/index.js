const router = require("express").Router();
const bookRoutes = require("./books");
const vendorRoutes = require("./vendor")

// Book routes
router.use("/books", bookRoutes);
router.use("/vendor",vendorRoutes)

module.exports = router;
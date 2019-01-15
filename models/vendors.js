const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;

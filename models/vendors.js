const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
  Company: { type: String, required: true },
	Username: { type: String, required: true },
	Password: { type: String, required: true }
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;

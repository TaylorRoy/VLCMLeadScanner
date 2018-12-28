const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leadsSchema = new Schema({
  scanId: { type: String, required: true },
  vendorId: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Leads = mongoose.model("Leads", leadsSchema);

module.exports = Leads;

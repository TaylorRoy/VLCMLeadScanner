const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendeeSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Attendee = mongoose.model("Attendee", attendeeSchema);

module.exports = Attendee;

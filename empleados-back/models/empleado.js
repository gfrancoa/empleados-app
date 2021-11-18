const mongoose = require("mongoose");

var EmpleadoSchema = new mongoose.Schema({
  name: { type: String },
  document: { type: String },
  phone: { type: String },
  email: { type: String },
  salary: { type: Number },
  isFemale: { type: Boolean },
  dateOfBirth: { type: Date },
});

module.exports = mongoose.model("empleado_data", EmpleadoSchema);

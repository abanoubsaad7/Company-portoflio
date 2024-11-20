const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aboutUsSchema = new Schema({
  companyName: String,
  description: String,
});
const AboutUs = mongoose.model("AboutUs", aboutUsSchema);

module.exports = AboutUs;

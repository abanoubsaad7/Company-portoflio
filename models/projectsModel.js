const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: String,
  describtion: String,
  category:String,
  coverPhoto:String,
  projectPhotos:String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

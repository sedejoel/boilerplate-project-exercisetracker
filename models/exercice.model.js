let mongoose = require("mongoose");

const exerciceSchema = new mongoose.Schema({
  id: String,
  description: String,
  duration: Number,
  date: String

});

let ExerciceModel = mongoose.model('Exercice', exerciceSchema);

module.exports = ExerciceModel;
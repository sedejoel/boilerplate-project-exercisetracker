let mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true }
  });

let UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
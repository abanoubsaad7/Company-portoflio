const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  facebookAcc:{
    name:String,
    link:String,
  },
  instgramAcc:{
    name:String,
    link:String,
  },
  twiterAcc:{
    name:String,
    link:String,
  },
  whatsApp:{
    name:String,
    link:String,
    phone:String,
  },
});
const Account = mongoose.model("Account", accountSchema);

module.exports = Account;

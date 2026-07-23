const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
   name :String,
   email : String,
   phone : Number,
   address : String,
   payment : String,
   cardnumber: {
    type: String,
    default: null,
  },
  expiry: {
    type: String,
    default: null,
  },
  cvv: {
    type: String,
    default: null,
  }
   
});

const  Information = mongoose.model('Information', Schema);

module.exports = Information;
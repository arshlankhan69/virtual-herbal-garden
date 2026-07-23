const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    
   plantName: String,
    image: String,
    content : String,
    price : Number,
    type : String,
})
   

const Listingstore = mongoose.model("Listingstore",Schema)


module.exports = Listingstore;
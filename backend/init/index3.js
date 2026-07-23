const mongoose = require("mongoose")
const initdata = require("./infodata.js")

const Information = require("../models/listing3.js")

const MONGO_URL = "mongodb://127.0.0.1:27017/herbal_garden"

main().then(() => { console.log("Connected to DB") }).catch((err) => {
    console.log(err)
})
async function main() {
    mongoose.connect(MONGO_URL);
}

const initDB =async () =>{
        await Information.deleteMany({})
        await Information.insertMany(initdata)

     console.log("data was initialized")
}

initDB();


require('dotenv').config();
const mongoose = require("mongoose")
const initdata = require("./forumdata.js")

const ForumPost = require("../models/listing2.js")

const MONGO_URL = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/herbal_garden"

main().then(() => { console.log("Connected to DB") }).catch((err) => {
    console.log(err)
})
async function main() {
    mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await ForumPost.deleteMany({})
    await ForumPost.insertMany(initdata)
    console.log("data was initialized")
}

initDB();


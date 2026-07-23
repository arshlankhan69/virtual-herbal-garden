const express = require("express")
const path = require("path")
const Listing = require("./models/listing.js")
const Listingstores = require("./models/listing1.js")
const Listingforums = require("./models/listing2.js")
const Information = require("./models/listing3.js")

const mongoose = require("mongoose")

const MONGO_URL = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/herbal_garden"

// Cache the connection across serverless invocations (important for Vercel)
let isConnected = false;
async function connectDB() {
    if (isConnected) return;
    await mongoose.connect(MONGO_URL);
    isConnected = true;
    console.log("Connected to DB");
}
connectDB().catch((err) => console.log(err));

const app = express()
const methodOverride = require("method-override");
app.use(methodOverride('_method'));

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "../frontend/views"))
app.use(express.static(path.join(__dirname, "../frontend/public")))
app.use(express.urlencoded({ extended: true })); // moved to top, was previously mid-file

// Make sure DB is connected before handling any request (safety net for cold starts)
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

//index route
app.get("/", async (req, res) => {
    let plants = await Listing.find()
    res.render("show.ejs", { plants: plants })
})

//store route
app.get('/store', async (req, res) => {
    let products = await Listingstores.find();
    res.render('store', { products: products });
});

app.get("/forum", async (req, res) => {
    let forumPosts = await Listingforums.find();
    res.render("forum", { forumPosts: forumPosts });
});

//add route 
app.get("/forum/add", (req, res) => {
    res.render("add.ejs")
});

//post route
app.post("/forum/add", async (req, res) => {
    const { title, author, content, tags } = req.body;
    const tagsArray = tags.split(',').map(tag => tag.trim());
    const newPost = new Listingforums({ title, author, content, tags: tagsArray, replies: 0 });
    await newPost.save();
    res.redirect("/forum");
});

//delete route
app.delete("/forum/:id", async (req, res) => {
    const { id } = req.params;
    await Listingforums.findByIdAndDelete(id);
    res.redirect("/forum");
});

//learn more
app.get("/learnmore/:id", async (req, res) => {
    let { id } = req.params
    let plant = await Listing.findById(id)
    res.render("learnmore.ejs", { plant: plant })
})

// Virtual Tour route
app.get("/virtualtour", async (req, res) => {
    let plants = await Listing.find();
    res.render("virtualtour.ejs", { plants: plants });
});

//search route — fixed to avoid crashing on missing/undefined fields
app.post("/search", async (req, res) => {
    let { plantName, commonName } = req.body;

    if (plantName && plantName.trim() !== "") {
        plantName = plantName.charAt(0).toUpperCase() + plantName.slice(1);
        let plant = await Listing.findOne({ plantName });
        if (plant) return res.redirect(`/learnmore/${plant._id}`);
    }

    if (commonName && commonName.trim() !== "") {
        commonName = commonName.charAt(0).toUpperCase() + commonName.slice(1);
        let plant1 = await Listing.findOne({ commonName });
        if (plant1) return res.redirect(`/learnmore/${plant1._id}`);
    }

    res.send("Plant not found");
})

app.get("/store/new", (req, res) => {
    res.redirect("/store")
})

app.get("/home/new", (req, res) => {
    res.redirect("/")
})

app.get("/forum/new", (req, res) => {
    res.redirect("/forum")
})

//render form
app.get("/store/form/:id", async (req, res) => {
    let { id } = req.params
    let item = await Listingstores.findById(id)
    res.render("buynow1.ejs", { item: item })
})

app.post("/store/placeorder/:id", async (req, res) => {
    let { id } = req.params
    let item = await Listingstores.findById(id)
    const { name, email, phone, address, payment, cardnumber, expiry, cvv } = req.body
    const info = new Information({ name, email, phone, address, payment, cardnumber, expiry, cvv });
    await info.save();
    res.render("buynow2.ejs", { item: item })
})

// Local dev server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

// Export for Vercel
module.exports = app;
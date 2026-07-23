const mongoose = require('mongoose');
const forumSchema = new mongoose.Schema({
   title: String,
    author: String,
    content: String,
    tags: [ String ],
    replies: Number,
    date: { type: Date, default: Date.now },
});

const ForumPost = mongoose.model('ForumPost', forumSchema);

module.exports = ForumPost;
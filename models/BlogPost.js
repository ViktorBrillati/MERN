//require our mongoose package
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create our BlogPost Schema
const BlogPostSchema = new Schema({
    title: String,
    body: String,
    userid: {
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: String
});

//from our Schema we create a model
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

//we export our BlogPost model so that it can be used elsewhere in our project
module.exports = BlogPost

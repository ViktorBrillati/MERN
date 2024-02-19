const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/BlogDB', { useNewUrlParser: true });

BlogPost.create({
    title: 'This is out first post',
    body: 'we are creating blog posts and persisting it with mongo'
});




const BlogPost = require('../models/BlogPost.js');

module.exports = async (req, res) => {
    const blogposts = await BlogPost.find({}).populate('userid');//find all collections and put them in blogposts
    console.log(req.session);
    res.render('index', { blogposts: blogposts });
}
const BlogPost = require('../models/BlogPost.js');
const path = require('path');

module.exports = async (req, res) => {
    try {
        console.log(req.body);
        let image = req.files.image;
        image.mv(path.resolve(__dirname, 'public/img', image.name));
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        });
        res.redirect('/');
    } catch(e) {
        console.log(e);
    }
}
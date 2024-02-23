//setting up a local server with express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const BlogPost = require('./models/BlogPost');
const port = 3000;

const app = new express();

app.set('view engine', 'ejs');

//express middleware 
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(fileUpload());

// string to our local mongodb 
mongoose.connect('mongodb://localhost/BlogDB');

//express routes
//set up our get route to the root route / 
app.get('/', async (req, res) => {
    //find all documents in our BlogPost collection, store the result in blogposts
    const blogposts = await BlogPost.find({});
    //render our index page and we send our blogposts array in a var named blogposts so that it can be used in index.ejs
    res.render('index', {blogposts:blogposts});
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

//we create our get route for each individual blog page 
//we update our route with :id which is a wild card that accepts any string value
app.get('/post/:id', async (req, res) => {
    //find a specific blogpost by id and save it to blogpost
    const blogpost = await BlogPost.findById(req.params.id);
    //render the post page and send blogpost aray to the page
    res.render('post', { blogpost: blogpost });
});

app.get('/posts/new', (req, res) => {
    res.render('create');
});

//we use async await for asynchronous method calling
app.post('/posts/store', async (req, res) => {
    let image = req.files.image
    image.mv(path.resolve(__dirname, 'public/img', image.name),
        async (error) => {
            await BlogPost.create({
                ...req.body,
                image: '/img/' + image.name
            });
            res.redirect('/');
        });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});


//the require function is similar to require which takes the name of the node module
//as a string argument and returns the package
/*
const http = require('node:http');
const host = 'localhost';
const port = 3000;
const requestListener = (req, res) => {
    res.writeHead(200);
    res.end('My first server');
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
*/
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

mongoose.connect('mongodb://localhost/BlogDB');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(fileUpload());

//this is our connection string to our local mongodb 
mongoose.connect('mongodb://localhost/BlogDB');


//these are our express routes
//we set up our get route to the root route / 
app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    console.log(blogposts)
    res.render('index', {
        blogposts
    });
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
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', { blogpost })
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
            res.redirect('/')
        });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});


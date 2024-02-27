//setting up a local server with express
const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const newPostController = require('./controllers/newPost.js');
const homeController = require('./controllers/home.js');
const storePostController = require('./controllers/storePost.js');
const getPostController = require('./controllers/getPost.js');
const newUserController = require('./controllers/newUser.js');
const storeUserController = require('./controllers/storeUser.js');
const loginController = require('./controllers/login.js');
const loginUserController = require('./controllers/loginUser.js');
const authMiddleware = require('./middleware/authMiddleware.js');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware.js');
const logoutController = require('./controllers/logout.js');

const app = new express();

app.set('view engine', 'ejs');

const validateMiddleWare = require('./middleware/validationMiddleware.js');

global.loggedIn = null;

//express middleware 
app.use(express.static('public'));
app.use(fileUpload());
app.use('/posts/store', validateMiddleWare);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard dog', resave:true, saveUninitialized: true }));
app.use('*', (req, res, next) => { loggedIn = req.session.userId; next(); });

// string to our local mongodb 
mongoose.connect('mongodb://localhost/BlogDB');

//express routes
//set up our get route to the root route / 
app.get('/', homeController);

//we create our get route for each individual blog page 
//we update our route with :id which is a wild card that accepts any string value
app.get('/post/:id', getPostController);

app.get('/posts/new', authMiddleware, newPostController);

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);

app.get('/auth/logout', logoutController);

app.post('/posts/store', authMiddleware, storePostController);

app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);

app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});


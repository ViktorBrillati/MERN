//setting up a local server with express
const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin-viktorb:5BSaPIkpzAfTQ3T6@cluster0.ln2np.mongodb.net/newBlogDB?retryWrites=true&w=majority&appName=Cluster0');

const app = new express();

const port = 3000;
const ejs = require('ejs');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');

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

const validateMiddleWare = require('./middleware/validationMiddleware.js');

app.set('view engine', 'ejs');

global.loggedIn = null;

//express middleware 
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.use('/posts/store', validateMiddleWare);
app.use(session(
    {
        secret: 'keyboard dog',
        resave: true,
        saveUninitialized: true
    }
));
app.use('*', (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});
app.use(flash());

//express routes
//set up our get route to the root route / 
app.get('/', homeController);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.get('/auth/logout', logoutController);
app.get('/post/:id', getPostController);
app.get('/posts/new', authMiddleware, newPostController);

app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);
app.post('/posts/store', authMiddleware, storePostController);

app.use((req, res) => {
    res.render('notfound');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});


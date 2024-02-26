const bcrypt = require('bcrypt');
const User = require('../models/User.js');

module.exports = (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username: username }).then((error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user._id;
                    res.redirect('/');
                } else {
                    res.redirect('/auth/login');
                }
            });
        } else {
            res.redirect('/auth/login');
        }
    });
}
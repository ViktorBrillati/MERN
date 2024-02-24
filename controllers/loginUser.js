const bcrypt = require('bcrypt');
const User = require('../models/User.js');

module.exports = (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username: username }, (error, same) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user.id;
                    res.redireect('/');
                } else {
                    res.redireect('/auth/login');
                }
            });
        } else {
            res.redirect('/auth/login');
        }
    });
}
const { error } = require('console');
const User = require('../models/User.js');
const path = require('path');

module.exports = (req, res) => {
    User.create(req.body).then((user) => {
        if (error) {
            return res.redirect('/auth/register');
        }
        console.log(error);
        res.redirect('/');
    });
}
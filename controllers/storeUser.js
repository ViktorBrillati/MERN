const { error } = require('console');
const User = require('../models/User.js');
const path = require('path');

module.exports = (req, res) => {
    User.create(req.body);
    if (error) {
        return res.redirect('/auth/register');
    } else {
        res.redirect('/');
    }
}
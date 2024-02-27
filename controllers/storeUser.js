const User = require('../models/User.js');
const path = require('node:path');

module.exports = async (req, res) => {
    try {
        await User.create(req.body);
    } catch (error) {
        console.log(error);
        res.redirect('/auth/register');
    }
    res.redirect('/');
}

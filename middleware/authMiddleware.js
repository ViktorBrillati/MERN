const User = require('../models/User.js');

module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.redirect('/');
        }
        next();
    } catch (error) {
        console.log(error);
    }
}
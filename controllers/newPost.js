module.exports = (req, res) => {
    if (req.session.userId) {
        res.render('create');
    }
    res.render('/auth/login');
}

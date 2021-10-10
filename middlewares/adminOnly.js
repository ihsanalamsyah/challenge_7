
module.exports = (req, res, next) => {
    if (req.user && req.user.username == 'admin'){
        next();
    }
    res.json('Bukan admin, gak bisa masuk');
}
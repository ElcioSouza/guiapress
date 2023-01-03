function adminAuth(req, res, next) {
    if(req.session.user != undefined) { //sessão existe
        next();
    } else { // se não sessão não existe
        res.redirect("/login");
    }
}

 module.exports = adminAuth
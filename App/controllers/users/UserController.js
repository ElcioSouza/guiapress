const express = require("express");
const User = require("../../models/users/usersModel");
const bcrypt = require("bcryptjs")
const Router = express.Router();


Router.get("/admin/users",(req,res) => {
    res.send("Listagem de usuários");
});

Router.get("/admin/users/create",(req,res) => {
    res.render("admin/users/create")
});

Router.post("/users/create",(req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({where:{email: email}}).then(user => {
          if(user == undefined) {

            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt); 
            
            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/");
            }).catch(err => {
                res.redirect("/");
            });

          } else {
            res.redirect("/admin/users/create");
          }
    });

  //  res.json({email, password})
});

module.exports = Router;
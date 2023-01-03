const express = require("express");
const User = require("../../models/users/usersModel");
const bcrypt = require("bcryptjs")
const Router = express.Router();


Router.get("/admin/users",(req,res) => {
    User.findAll().then(users => {
      res.render("admin/users/index",{users});
    });
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

Router.get("/login",(req,res) => {
  res.render("admin/users/login")
});

Router.post("/authenticate",(req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({where:{email: email}}).then(user => {

        if(user != undefined) { // se existe um usuario com esse email - thomasa@gmail.com
            // valida senha
          
            let correct = bcrypt.compareSync(password,user.password) //  1 parametro senha usuario digitou e 2 parametro senha que esta no bd

            if(correct) { // se senha esta correta blz
              
              req.session.user = {
                id: user.id,
                email: user.email
              };
              //res.json(req.session.user);
              res.redirect("/admin/articles")
            } else {
              res.redirect("/login");
            }
        } else {
          res.redirect("/login");
        }
    })
});

Router.get("/logout",(req,res) => {
    req.session.user = undefined;
    res.redirect("/");
});

module.exports = Router;
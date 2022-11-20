const express = require("express");
const Router = express.Router();
const Category = require("../../models/categories/CategoryModel");
const slugify = require("slugify")

Router.get('/admin/categories/new', (req, res) => {
    res.render("admin/categories/new");
})  

Router.get('/categories', (req, res) => {
       res.send("rota de categories");
})

Router.post('/categories/save', (req, res) => {
   let title = req.body.title;
   if(title) {
    Category.create({title,slug:slugify(title)})
            .then(() => {
                res.redirect("/admin/categories") 
            })
   } else {
        res.redirect("/admin/categories/new")
   }
})


Router.post('/categories/delete', (req, res) => {
    
    let id = req.body.id;

    if(id){

       if(!isNaN(id)) { // se id nao é um numero vai verificar
            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/categories");
            })
       } else {
          res.redirect("/admin/categories");
       }
    } else {
        res.redirect("/admin/categories");
    }
});


Router.get('/admin/categories', (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index",{categories});
    });
});
Router.get('/admin/categories/edit/:id', (req, res) => {
    let id = req.params.id;

    if(isNaN(id)) {
        res.redirect("/admin/categories")
        return;
    }
    // pesquisar pelo id
    Category.findByPk(id).then(category => {
     
        if(category) {
            res.render("admin/categories/edit",{category});
        } else {
            res.redirect("/admin/categories");
        }
    }).catch(erro =>{
        res.redirect("/admin/categories");
    }); 
});

module.exports = Router;
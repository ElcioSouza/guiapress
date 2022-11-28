const express = require("express");
const Router = express.Router();
const Category = require("../../models/categories/CategoryModel");
const Article = require("../../models/articles/ArticleModel");
const slugify = require("slugify");

Router.get('/admin/articles', (req, res) => {
    // na buscar de artigo quero voce inclua a tabela categoria tambem ou seja join - include: [{model: Category}]
      Article.findAll({
         include: [{model: Category}]
      }) // incluindo meu model de categoria
             .then(articles => {
                res.render("admin/articles/index",{articles})
             });
})

Router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new",{categories})
    })
})

Router.post("/article/save", (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.category;

    Article.create({
        title,
        slug: slugify(title),
        body,
        categoryId: category
    }).then(() => {
        res.redirect("/admin/articles")
    })
})

Router.post('/articles/delete', (req, res) => {
    
    let id = req.body.id;

    if(id){

       if(!isNaN(id)) { // se id nao é um numero vai verificar
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles");
            })
       } else {
          res.redirect("/admin/articles");
       }
    } else {
        res.redirect("/admin/articles");
    }
});

module.exports = Router;
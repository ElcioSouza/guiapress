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

Router.get('/admin/articles/edit/:id', (req, res) => {
    let id = req.params.id;
 
    // pesquisar pelo id
    Article.findByPk(id).then(article => {
        
        if(article) {
            Category.findAll().then(categories => {
                res.render("admin/articles/edit",{categories,article});
            })
        } else {
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    }); 
});

Router.post('/articles/update', (req, res) => {
    let title = req.body.title;
    let id = req.body.id;
    let body = req.body.body;
    let category = req.body.category;
    
    Article.update({title:title,body:body,slug:slugify(title),categoryId:category}, {
        where: {
            id:id
        }
    }).then(() => {
        res.redirect("/admin/articles");
    }).catch(err => {
        res.redirect("/");
    })
});

Router.get('/articles/page/:num', (req, res) => {
    let page = req.params.num
    let offset = 0;
    if(isNaN(page) || page == 1) { // se não for um numero ou pagina for == 1
        offset = 0; // quero começar apartir do primeiro registro que sera exibido
    } else {
        offset = (Number(page) - 1) * 4; // offset = parseInt(page) * limit; esse 4 e o limit:4 
    }
    
    Article.findAndCountAll({
        limit: 4, // vai de 4 em 4 por exemplo limit: 4
        offset: offset, // aonde vou começar o registro
        order: [
            ["id","DESC"]
        ]
    }).then(articles => {
          
          let next;
          // se for offset + limit >= articles.count(total de artigo) quer dizer ultrapassei os artigo não existe outra pagina para ser exibido 
          if(offset + 4 >= articles.count) {
             next = false;
          } else {
             next = true;
          }

        const result = {
            page: Number(page),
            next: next,
            articles: articles
        }

        Category.findAll().then(categories => {
            res.render("admin/articles/page",{result,categories})
        })

       // res.json(result);
    })
})


module.exports = Router;
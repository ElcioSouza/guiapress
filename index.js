const express = require("express") // importando o framework express
const App = express();
const bodyParser = require("body-parser")
const connection = require("./App/database/database");
const categoriesController = require("./App/controllers/categories/CategoriesController");
const articlesController = require("./App/controllers/article/ArticleController");
const UsersController = require("./App/controllers/users/UsersController");
const Article = require("./App/models/articles/ArticleModel");
const Category = require("./App/models/categories/CategoryModel");
const Users = require("./App/models/users/usersModel");


App.set('view engine', 'ejs');
App.use(express.static("public"));
App.use(bodyParser.urlencoded({ extended: false })) // aceita dados de formulario
App.use(bodyParser.json())

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feito com sucesso");
    }).catch((error) => {
        console.log(`Ocorreu esse erro: ${error}`);
    })

App.use("/", categoriesController);
App.use("/", articlesController);
App.use("/", UsersController);

App.get("/", (req, res) => {
    Article.findAll({
        order: [
            ["id","DESC"]
        ],
        limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index",{articles,categories})
        })
    })
})

App.get("/:slug", (req, res) => {
    let slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        } 
    }).then(article =>{
        if(article) {
            Category.findAll().then(categories => {
                res.render("article",{article,categories})
            })
        } else {
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    })

})

App.get("/category/:slug", (req, res) => {
    let slug = req.params.slug;
    // O método Sequelize findOne()é usado para recuperar exatamente UM registro correspondente
     Category.findOne({
        where: {
            slug: slug
        }, 
        include: [{model: Article}]
    }).then(category => {
        if(category) {

            Category.findAll().then(categories => {
                res.render("index",{articles: category.articles,categories})
            })
            
        } else {
           res.redirect('/')
        }
    }).catch(err => {
        res.redirect('/')
    })
})

App.listen("8000", () => {
    console.log("O server listening on");
})

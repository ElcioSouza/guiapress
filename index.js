const express = require("express") // importando o framework express
const App = express();
const bodyParser = require("body-parser")
const connection = require("./App/database/database");
const categoriesController = require("./App/controllers/categories/CategoriesController");
const articlesController = require("./App/controllers/article/ArticleController");
const article = require("./App/models/articles/ArticleModel");
const category = require("./App/models/categories/CategoryModel");

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

App.get("/", (req, res) => {
    res.render("index")
})

App.listen("8000", () => {
    console.log("O server listening on");
})

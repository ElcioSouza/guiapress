const Sequelize = require("sequelize");
const conn = require("../../database/database");
const Category = require("../categories/CategoryModel")

const Article = conn.define('articles',{
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Category.hasMany(Article); //  hasMany() => tem muitos 1 Para n. cada Categoria tem muitos artigos
Article.belongsTo(Category); // belongsTo() => pertence a 1 Para 1. cada Artigo pertence a uma categoria

Article.sync({force: false});

module.exports = Article;
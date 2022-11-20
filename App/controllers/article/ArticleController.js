const express = require("express");
const Router = express.Router();

Router.get('/articles', (req, res) => {
       res.send("rota de artigo");
})

Router.get('/admin/articles/new', (req, res) => {
    res.send("rota para criar novo artigo");
})

module.exports = Router;
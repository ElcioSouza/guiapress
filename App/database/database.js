const Sequelize = require("sequelize");

const conn = new Sequelize('guiapress','root','',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
})

module.exports = conn;
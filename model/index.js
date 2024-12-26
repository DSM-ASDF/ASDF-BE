const Sequelize = require("sequelize");
const config = require("../config/config");

const db = {};
const sequelize = new Sequelize({
  ...config,
  sync: false,
  logging: console.log,
});

db.sequelize = sequelize;

const User = require("./user");
User.initiate(sequelize);
db.user = User;

module.exports = db;

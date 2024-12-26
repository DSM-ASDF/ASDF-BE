const Sequelize = require("sequelize");
const config = require("../config/config");

const db = {};
const sequelize = new Sequelize({
  ...config,
  sync: false,
  logging: console.log,
});

db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize)
db.chat = require("./chat.js")(sequelize, Sequelize);
db.comment = require("./comment.js")(sequelize, Sequelize);
db.message = require("./message.js")(sequelize, Sequelize);
db.schedule = require("./schedule.js")(sequelize, Sequelize);
db.team = require("./team.js")(sequelize, Sequelize);
db.todo = require("./todo.js")(sequelize, Sequelize);

module.exports = db;

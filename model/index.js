const Sequelize = require("sequelize");
const config = require("../config/config");

const db = {};
const sequelize = new Sequelize({
  ...config,
  sync: false,
  logging: console.log,
});

db.sequelize = sequelize;

const User = require("./user.js");
User.initiate(sequelize);

const Chat = require("./chat.js");
Chat.initiate(sequelize);

const Message = require("./message.js");
Message.initiate(sequelize);

const Schedule = require("./schedule.js");
Schedule.initiate(sequelize);

const Team = require("./team.js");
Team.initiate(sequelize);

const Todo = require("./todo.js");
Todo.initiate(sequelize);

const Comment = require("./comment.js");
Comment.initiate(sequelize);

db.sequelize = sequelize;
db.User = User;
db.Chat = Chat;
db.Message = Message;
db.Schedule = Schedule;
db.Team = Team;
db.Todo = Todo;
db.Comment = Comment;

module.exports = db;

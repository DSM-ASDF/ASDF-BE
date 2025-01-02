const Sequelize = require("sequelize");

class Comment extends Sequelize.Model {
  static initiate(sequelize) {
    Comment.init(
      {
        commentId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        commentDate: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        commentDetail: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        userName: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        userProfile: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        todoId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Todo",
            key: "todoId"
          }
        }
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Comment",
        tableName: "comment",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Comment.belongsTo(db.Todo, {
      foreignKey: "todoId",
      targetKey: "todoId",
      onDelete: "cascade"
    })
  }
}

module.exports = Comment
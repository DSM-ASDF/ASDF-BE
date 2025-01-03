const Sequelize = require("sequelize");

class Chat extends Sequelize.Model {
  static initiate(sequelize) {
    Chat.init(
      {
        chatId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        chatName: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        chatDate: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Chat",
        tableName: "chat",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Chat.belongsToMany(db.User, {
      through: "IncludeChat",
      foreignKey: "chatId",
      otherKey: "userId",
      onDelete: "cascade",
    });

    db.Chat.hasMany(db.Message, {
      sourceKey: "chatId",
      foreignKey: "chatId",
      onDelete: "cascade",
    });
  }
}

module.exports = Chat;

const Sequelize = require("sequelize");

class Message extends Sequelize.Model {
  static initiate(sequelize) {
    Message.init(
      {
        messageId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        writerProfile: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        writerName: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        writerDate: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        writerContent: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        chatId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Chat",
            key: "chatId"
          },
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Message",
        tableName: "message",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Message.belongsTo(db.Chat, {
      sourceKey: "chatId",
      targetKey: "chatId",
      onDelete: "cascade",
    });
  }
}

module.exports = Message;

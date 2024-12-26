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
  static associate(db) {}
}

module.exports = Message;

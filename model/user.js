const { Sequelize } = require("sequelize");

class user extends Sequelize.Model {
  static initiate(sequelize) {
    user.init(
      {
        userId: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        accountId: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(60),
          allowNull: false,
        },
        profile: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        accessToken: {
          type: Sequelize.STRING(),
          nullable: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "user",
        tableName: "USER",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
}

module.exports = user;

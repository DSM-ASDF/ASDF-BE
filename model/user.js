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
        modelName: "User",
        tableName: "user",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.belongsToMany(db.Team, {
      through: "IncludeTeam",
      foreignKey: "userId",
      otherKey: "teamId",
      onDelete: "cascade",
    });

    db.User.belongsToMany(db.Chat, {
      through: "IncludeChat",
      foreignKey: "userId",
      otherKey: "chatId",
      onDelete: "cascade"
    })
  }
}

module.exports = user;

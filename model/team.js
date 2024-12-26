const Sequelize = require("sequelize");

class Team extends Sequelize.Model {
  static initiate(sequelize) {
    Team.init(
      {
        teamId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        teamName: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        teamOwner: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Team",
        tableName: "team",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Team.belongsToMany(db.User, {
      through: "IncludeTeam",
      foreignKey: "teamId",
      otherKey: "userId",
      onDelete: "cascade",
    });
  }
}

module.exports = Team;

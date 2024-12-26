const Sequelize = require("sequelize");

class Schedule extends Sequelize.Model {
  static initiate(sequelize) {
    Schedule.init(
      {
        scheduleId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        scheduleTitle: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        scheduleDate: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Schedule",
        tableName: "schedule",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {}
}

module.exports = Schedule;

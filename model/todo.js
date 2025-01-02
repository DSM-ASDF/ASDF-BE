const Sequelize = require("sequelize");

class Todo extends Sequelize.Model {
  static initiate(sequelize) {
    Todo.init(
      {
        todoId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        todoTitle: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        todoOwner: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "User",
            key: "userId"
          },
        },
        todoLabel: {
          type: Sequelize.ENUM,
          values: [
            "FrontEnd",
            "BackEnd",
            "Android",
            "ios",
            "Design",
            "AI",
            "Game",
            "Flutter",
            "Embedded",
            "DevOps",
            "Security",
            "PM",
            "QA",
          ],
          defaultValue: "FrontEnd",
        },
        todoWorkArea: {
          type: Sequelize.ENUM,
          values: [
            "기능개발",
            "버그",
            "퍼블리싱",
            "기획",
            "문서화",
            "테스트",
            "배포",
          ],
          defaultValue: "기능개발",
        },
        todoPriority: {
          type: Sequelize.ENUM,
          values: ["낮음", "중간", "긴급"],
          defaultValue: "낮음",
        },
        todoDetail: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        todoProgress: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        todoDate: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Todo",
        tableName: "todo",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Todo.hasMany(db.Comment, {
      sourceKey: "todoId",
      foreignKey: "todoId",
      onDelete: "cascade",
    });
  }
}

module.exports = Todo;
